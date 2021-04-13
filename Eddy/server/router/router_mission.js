const express = require("express");
const session = require("express-session");
const router = express.Router();
let UserAccount = require("../model/model_account.js");
let Mission=require('../model/model_mission.js');
const cors = require("cors");

router.use(cors());

router.use(session({ secret: "random", resave: false, saveUninitialized: true }));

router.get("/mission", (req, res) => {
  //show the progress of user's mission
  if (!req.session.username) {
    return res.status(401).send();
  }

  

  UserAccount.findOne({ username: req.session.username }, function (err, result) {
    const missionFinished = [];
     
    function missionFind(useraccount){

      Mission.find({useraccount:useraccount}).sort({missionID:'ascending'}).exec(function(err,missionArray){
        if(err){
          console.log("mission find error");
          console.log(err);
        }else{
           missionArray.forEach(element=>missionFinished.push(element.missionID));
           return;
        }
        });

    }


    if (err) {
      res.send(err);
    } else {
        missionFind(result._id);
      return res.json({
        missionFinishedID: missionFinished,
      });
    }
  });
});

module.exports = router;
