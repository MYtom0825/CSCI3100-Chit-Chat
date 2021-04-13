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
  if (!username) {
    return res.status(401).send();
  }

  //insert into queue db
  function getProfile(id) {
    UserProfile.findOne({ account: id })
      .populate("userProfile")
      .exec(function (err, result) {
        if (err) {
          console.log(err);
          return [];
        } else {
          return result;
        }
      });
  }

  function getAccount() {
    UserAccount.findOne({ username: req.session.username }, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        return result;
      }
    });
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

  var account;
  var profile;
  var quiz;
  var profileGender = profile.gender;
  var profileUni = profile.uni;
  var profileMajor = profile.major;
  var profileYear = profile.year;
  var profileStatus = profile.status;

  lookfor();

  function delQueue(id) {
    Queue.deleteOne({ userAccount: id }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`User ${id} deleted from the queue`);
      }
    });
  }

  const matchUsers = Queue.find({
    $and: [
      { requiredGender: { profileGender, $exists: true, $ne: [] } },
      { requiredUni: { profileUni, $exists: true, $ne: [] } },
      { requiredMajor: { profileMajor, $exists: true, $ne: [] } },
      { requiredYear: { profileYear, $exists: true, $ne: [] } },
      { requiredStatus: { profileStatus, $exists: true, $ne: [] } },
    ],
  }).populate('userAccount').populate('userProfile').sort({ queueNumber: 1 });

  if (matchUsers !== {}) {     //there are users in queue that current user satisfy his requirement
    //check if the matched user also satisfy current user's requirement
    matchUsers.forEach((element) => {
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
            {id: quiz[0].quizID, question: quiz[0].question, answer: [quiz[0].answer1, quiz[0].answer2]},
            {id: quiz[1].quizID, question: quiz[1].question, answer: [quiz[1].answer1, quiz[1].answer2]},
            {id: quiz[2].quizID, question: quiz[2].question, answer: [quiz[2].answer1, quiz[2].answer2]}
          ],
          contact: element.userProfile.contact,
          info: {
            name: element.userProfile.nickname,
            gender: element.userProfile.gender,
            picture: element.userProfile.picture,
            description: element.userProfile.description,
            faculty: element.userProfile.faculty,
            university: element.userProfile.university,
            year: element.userProfile.year,
            status: element.userProfile.status,
            commonInterest: commonInterest,
          },
          room: roomID,
        };
        delQueue(element.account._id); //del matched user in Queue
        console.log(json);
        return res.json(json); //send 3 popup_quiz, ig, info(name, array of comment interest), chatroom
      }
    });
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
        const queueExist = Queue.exists({ userProfile: profile._id });
        while (queueExist) {}
        account = await getAccount();
        const matched = UserAccount.findOne({ username: account.MatchedUser }).populate('userProfile')
        let json = {
          questions: [
            {id: quiz[0].quizID, question: quiz[0].question, answer: [quiz[0].answer1, quiz[0].answer2]},
            {id: quiz[1].quizID, question: quiz[1].question, answer: [quiz[1].answer1, quiz[1].answer2]},
            {id: quiz[2].quizID, question: quiz[2].question, answer: [quiz[2].answer1, quiz[2].answer2]}
          ],
          contact: element.userProfile.contact,
          info: {
            name: element.userProfile.nickname,
            gender: element.userProfile.gender,
            picture: element.userProfile.picture,
            description: element.userProfile.description,
            faculty: element.userProfile.faculty,
            university: element.userProfile.university,
            year: element.userProfile.year,
            status: element.userProfile.status,
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

//popup quiz, after answered then send to backend.
//send common interest and ig and answer to frontend for broadcast...
//send 2 user_id to backend to notice ended chat

module.exports = router;
