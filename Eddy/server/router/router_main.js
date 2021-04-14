const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
let UserProfile = require("../model/model_profile.js");
let UserAccount = require("../model/model_account.js");
let Queue = require("../model/model_queue.js");
let Quiz = require("../model/model_quiz.js");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/main", (req, res) => {
  res.send("running la");
});

router.post("/match", (req, res) => {
  console.log(req.body);
  //matching
  if (!req.session.username) {
    return res.status(401).send();
  }

  function getProfile(id) {
    var result;
    result = UserProfile.findOne({ account: id }).exec();
    return result;
  }

  function getAccount() {
    var result;
    UserAccount.findOne({ username: req.session.username }).exec();
    return result;
  }

  function getQuiz() {
    var cnt = 0;
    Quiz.aggregate([{ $sample: { size: 3 } }]).foreach((element) => {
      quiz[cnt] = element;
      cnt++;
    });
    return quiz;
  }

  async function lookfor() {
    account = await getAccount();
    profile = await getProfile(account._id);
    quiz = await getQuiz();
  }

  //set filters
  var filterGender = req.body.gender;
  var filterUni = req.body.uni;
  var filterMajor = req.body.major;
  var filterYear = req.body.year;
  var filterStatus = req.body.status;
  console.log(filterGender);
  console.log(filterUni);
  console.log(filterMajor);
  console.log(filterYear);
  console.log(filterStatus);

  var account;
  var profile;
  var quiz;

  function delQueue(id) {
    Queue.deleteOne({ userAccount: id }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`User ${id} deleted from the queue`);
      }
    });
  }

  account = UserAccount.findOne({ username: req.session.username }, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      account = result;
      console.log(account);
      profile = UserProfile.findOne({ account: account._id }, function (err, result) {
        if (err) {
          console.log(err);
        }
        else {
          profile = result;
          console.log(profile);
          Quiz.aggregate([{ $sample: { size: 3 } }], function (err, result) {
            if (err) {
              console.log(err);
            }
            else {
              quiz = result;
              console.log(quiz);
              var profileGender = profile.gender;
              var profileUni = profile.uni;
              var profileMajor = profile.major;
              var profileYear = profile.year;
              var profileStatus = profile.status;

              Queue.find({
                $and: [
                  { requiredGender: { profileGender, $exists: true, $ne: [] } },
                  { requiredUni: { profileUni, $exists: true, $ne: [] } },
                  { requiredMajor: { profileMajor, $exists: true, $ne: [] } },
                  { requiredYear: { profileYear, $exists: true, $ne: [] } },
                  { requiredStatus: { profileStatus, $exists: true, $ne: [] } },
                ],
              })
                .populate("userAccount")
                .populate("userProfile")
                .sort({ queueNumber: 1 })
                .exec(function (err, result) {
                  if (err) {
                    console.log(err);
                  }
                  else {
                    var matchUsers = result;
                    console.log(matchUsers);
                    if (matchUsers.length != 0) {
                      //there are users in queue that current user satisfy his requirement
                      //check if the matched user also satisfy current user's requirement
                      for (var i = 0; i < matchUsers.length; i++) {
                        if (
                          (filterGender === null || element.userProfile.gender === filterGender) &&
                          (filterUni === null || element.userProfile.uni === filterUni) &&
                          (filterMajor === null || element.userProfile.major === filterMajor) &&
                          (filterYear === null || element.userProfile.year === filterYear) &&
                          (filterStatus === null || element.userProfile.status === filterStatus)
                        ) {
                          let commonInterest = profile.interest.filter((x) => element.userProfile.interest.includes(x));

                          let json = {
                            questions: [
                              { id: quiz[0].quizID, question: quiz[0].question, answer: [quiz[0].answer1, quiz[0].answer2] },
                              { id: quiz[1].quizID, question: quiz[1].question, answer: [quiz[1].answer1, quiz[1].answer2] },
                              { id: quiz[2].quizID, question: quiz[2].question, answer: [quiz[2].answer1, quiz[2].answer2] },
                            ],
                            contact: matchUsers[i].userProfile.contact,
                            info: {
                              name: matchUsers[i].userProfile.nickname,
                              gender: matchUsers[i].userProfile.gender,
                              picture: matchUsers[i].userProfile.picture,
                              description: matchUsers[i].userProfile.description,
                              faculty: matchUsers[i].userProfile.faculty,
                              university: matchUsers[i].userProfile.university,
                              year: matchUsers[i].userProfile.year,
                              status: matchUsers[i].userProfile.status,
                              commonInterest: commonInterest,
                            },
                            room: matchUsers[i].room,
                          };
                          delQueue(matchUsers[i].account._id); //del matched user in Queue
                          console.log(json);
                          return res.json(json); //send 3 popup_quiz, ig, info(name, array of comment interest), chatroom
                        }
                      }
                    } else {
                      console.log("no matched user");
                      //set new Queue with info inside profile
                      const newQueue = new Queue({
                        _id: new mongoose.Types.ObjectId(),
                        userAccount: account._id,
                        userProfile: profile._id,
                        room: Math.random().toString(36).substr(8),
                        requiredGender: gender,
                        requiredUni: uni,
                        requiredMajor: major,
                        requiredYear: year,
                        requiredStatus: status,
                      });

                      newQueue.save(async function (err, record) {
                        if (err) {
                          console.log("Queue can't be save");
                        } else {
                          console.log("Queue saved");
                          //wait until updated
                          const queueExist = true;
                          do {
                            queueExist = Queue.exists({ userProfile: profile._id });
                          }
                          while (queueExist) { }
                          account = await getAccount();
                          UserAccount.findOne({ username: account.MatchedUser })
                            .populate("userProfile")
                            .exec(function (err, result) {
                              if (err) {
                                console.log(err);
                              }
                              else {
                                var matched = result;
                                let json = {
                                  questions: [
                                    { id: quiz[0].quizID, question: quiz[0].question, answer: [quiz[0].answer1, quiz[0].answer2] },
                                    { id: quiz[1].quizID, question: quiz[1].question, answer: [quiz[1].answer1, quiz[1].answer2] },
                                    { id: quiz[2].quizID, question: quiz[2].question, answer: [quiz[2].answer1, quiz[2].answer2] },
                                  ],
                                  contact: matched.userProfile.contact,
                                  info: {
                                    name: matched.userProfile.nickname,
                                    gender: matched.userProfile.gender,
                                    picture: matched.userProfile.picture,
                                    description: matched.userProfile.description,
                                    faculty: matched.userProfile.faculty,
                                    university: matched.userProfile.university,
                                    year: matched.userProfile.year,
                                    status: matched.userProfile.status,
                                    commonInterest: commonInterest,
                                  },
                                  room: roomID,
                                };
                                console.log(json);
                                return res.send(json);
                              }

                            });

                        }
                      });
                    }
                  }
                });

            }

          });

        }
      });

    }
  });
  /*
    */
});

//popup quiz, after answered then send to backend.
//send common interest and ig and answer to frontend for broadcast...
//send 2 user_id to backend to notice ended chat

module.exports = router;
