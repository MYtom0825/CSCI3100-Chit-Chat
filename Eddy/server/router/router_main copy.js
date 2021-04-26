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
  //matching
  if (!req.body.username) {
    return res.status(401).send();
  }
  //get user profile (not in use now)
  function getProfile(id) {
    var result;
    result = UserProfile.findOne({ account: id }).exec();
    return result;
  }
  //get user account (not in use now)
  function getAccount() {
    var result;
    UserAccount.findOne({ username: req.body.username }).exec();
    return result;
  }
  //get quiz (not in use now)
  function getQuiz() {
    var cnt = 0;
    Quiz.aggregate([{ $sample: { size: 3 } }]).foreach((element) => {   //random generate 3 quizzes from db
      quiz[cnt] = element;
      cnt++;
    });
    return quiz;
  }
  //initially used to get those informations (not in use now)
  async function lookfor() {
    account = await getAccount();
    profile = await getProfile(account._id);
    quiz = await getQuiz();
  }

  //set filters
  var filterGender = req.body.gender;
  var filterUni = req.body.university;
  var filterFaculty = req.body.faculty;
  var filterYear = req.body.year;
  var filterStatus = req.body.status;
  if (filterGender == undefined) filterGender = "";
  if (filterStatus == undefined) filterStatus = "";
  if (filterYear == undefined) filterYear = "";

  var account;
  var profile;
  var quiz;

  //update the queue db record with userProfile = userId by modifying matchedProfile = matchedId
  function updateQueue(userId, matchedId) {
    Queue.updateOne({ userProfile: userId }, { matchedProfile: matchedId }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`User profile ${matchedId} is matched!`);
      }
    });
  }
  //find the user account
  account = UserAccount.findOne({ username: req.body.username }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      account = result;
      console.log(account);
      //find the profile account
      profile = UserProfile.findOne({ account: account._id }, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          profile = result;
          console.log(profile);
          //get the user info from profile
          var profileGender = profile.gender;
          var profileUni = profile.university;
          var profileFaculty = profile.faculty;
          var profileYear = profile.year;
          var profileStatus = profile.status;

          //find the user in queue that the current user match the waiting user's requirement
          Queue.find({
            requiredGender: { $in: [profileGender, ""] },
            requiredUni: { $in: [profileUni, ""] },
            requiredFaculty: { $in: [profileFaculty, ""] },
            requiredYear: { $in: [profileYear, ""] },
            requiredStatus: { $in: [profileStatus, ""] },
          })
            .populate("userProfile")
            .sort({ queueNumber: 1 })
            .exec(function (err, result) {
              if (err) {
                console.log(err);
              } else {
                var matchUsers = result;
                if (matchUsers.length != 0) {
                  //there are users in queue that current user satisfy his requirement
                  //loop for all waiting users to check if the matched user also satisfy current user's requirement
                  for (var i = 0; i < matchUsers.length; i++) {
                    if (  //if waiting user satisfy current user's requirement
                      (filterGender == "" || matchUsers[i].userProfile.gender == filterGender) &&
                      (filterUni == "" || matchUsers[i].userProfile.university == filterUni) &&
                      (filterFaculty == "" || matchUsers[i].userProfile.faculty == filterFaculty) &&
                      (filterYear == "" || matchUsers[i].userProfile.year == filterYear) &&
                      (filterStatus == "" || matchUsers[i].userProfile.status == filterStatus)
                    ) {
                      //get comment interest
                      let commonInterest = profile.interest.filter((x) => matchUsers[i].userProfile.interest.includes(x));
                      //define the json file to send to frontend
                      let json = {
                        questions: [
                          { id: "001", question: "Which food do you like more?", answer: ["Option A", "Option B"] },
                          { id: "002", question: "Which animal do you like more?", answer: ["Option A", "Option B"] },
                          { id: "003", question: "Which city do you like more?", answer: ["Option A", "Option B"] },
                        ],
                        contact: matchUsers[i].userProfile.contact,
                        info: {
                          name: matchUsers[i].userProfile.nickName,
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
                      console.log("Chere???");
                      updateQueue(matchUsers[i].userProfile._id, profile._id); //del matched user in Queue
                      console.log(json);
                      return res.json(json); //send 3 popup_quiz, ig, info(name, array of comment interest), chatroom
                    }
                    console.log("WTFhere???");
                  }
                } else {  //no matched users found in queue db
                  console.log("no matched user");
                  //set new Queue with info inside profile
                  const newQueue = new Queue({
                    _id: new mongoose.Types.ObjectId(),
                    userAccount: account._id,
                    userProfile: profile._id,
                    room: Math.random().toString(36).substr(8),
                    requiredGender: filterGender,
                    requiredUni: filterUni,
                    requiredFaculty: filterFaculty,
                    requiredYear: filterYear,
                    requiredStatus: filterStatus,
                  });
                  //store current user into queue db
                  newQueue.save(async function (err, record) {
                    if (err) {
                      console.log("Queue can't be save");
                    } else {
                      console.log("Queue saved");
                      //wait until updated
                      const queueExist = true;
                      do {  //this check if queue db is updated(being matched) but should not work
                        Queue.exists({ matchedProfile: { $exists: true, $ne: null } }, function (err, result) {
                          if (err) {
                            console.log(err);
                          } else {
                            queueExist = result;
                          }
                        });
                      } while (queueExist);   //infinite loop causing error
                      //delete current user from queue db
                      Queue.findOneAndDelete({ userProfile: profile._id })
                        .populate("matchedProfile")
                        .exec(function (err, result) {
                          if (err) {
                            console.log(err);
                          } else {
                            var queue = result;
                            //define json file to be sent to frontend
                            let json = {
                              questions: [
                                { id: "001", question: "Which food do you like more?", answer: ["Option A", "Option B"] },
                                { id: "002", question: "Which animal do you like more?", answer: ["Option A", "Option B"] },
                                { id: "003", question: "Which city do you like more?", answer: ["Option A", "Option B"] },
                              ], //a
                              contact: queue.matchedProfile.contact,
                              info: {
                                name: queue.matchedProfile.nickname,
                                gender: queue.matchedProfile.gender,
                                picture: queue.matchedProfile.picture,
                                description: queue.matchedProfile.description,
                                faculty: queue.matchedProfile.faculty,
                                university: queue.matchedProfile.university,
                                year: queue.matchedProfile.year,
                                status: queue.matchedProfile.status,
                                commonInterest: commonInterest,
                              },
                              room: queue.room,
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
  /*
   */
});

//popup quiz, after answered then send to backend.
//send common interest and ig and answer to frontend for broadcast...
//send 2 user_id to backend to notice ended chat

module.exports = router;
