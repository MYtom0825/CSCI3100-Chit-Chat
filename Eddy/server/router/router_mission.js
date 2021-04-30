const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let UserAccount = require("../model/model_account.js");
let Mission = require("../model/model_mission.js");
const cors = require("cors");

router.use(cors());

router.get("/mission", (req, res) => {
  //show the progress of user's mission
  if (!req.query.username) {
    return res.status(401).send();
  }

  UserAccount.findOne({ username: req.query.username }, function (err, result) {
    if (err) {
      res.send(err);
    } else if (result == null) {
      res.send("user cant be found");
    } else {
      Mission.find({ useraccount: result.id })
        .sort({ missionID: "ascending" })
        .exec(function (err, missionArray) {
          var missionFinished = [];
          if (err) {
            console.log("mission find error");
            console.log(err);
          } else {
            missionArray.forEach((element) => missionFinished.push(element.missionID));
            return res.json({
              missionFinishedID: missionFinished,
            });
          }
        });
    }
  });
});

router.post("/mission", (req, res) => {
  //update mission database if user has finished new mission
  let string = JSON.stringify(req.body);
  let index = string.search("missionFinished");
  let editted = string.slice(0, index + 15) + string.slice(index + 17);
  let array = JSON.parse(editted);
  UserAccount.findOne({ username: req.body.username }, function (err, user) {
    if (array.missionFinished[1] != undefined) {
      array.missionFinished.map((mission) => {
        Mission.exists({ useraccount: user._id, missionID: mission }, function (err, exist) {
          if (err) {
            console.log("mission exist error");
          } else if (exist == false) {
            var newMission = new Mission({
              _id: new mongoose.Types.ObjectId(),
              useraccount: user._id,
              missionID: mission,
            });
            newMission.save((error) => {
              if (error) {
                console.log(error);
              }
            });
          }
        });
      });
    }
  });
  res.status(200).send("Mission updated!");
});

module.exports = router;
