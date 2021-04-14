const express = require("express");
const router = express.Router();
let UserAccount = require("../model/model_account.js");
let Mission=require('../model/model_mission.js');
const cors = require("cors");

router.use(cors());


router.get("/mission", (req, res) => {
  //show the progress of user's mission
  console.log(req.session.id);

  if (!req.body.username) {
    return res.status(401).send();
  }

  UserAccount.findOne({ username: req.body.username }, function (err, result) {
    
    if (err) {
      res.send(err);
    } else if(result==null){
      res.send("user cant be found");
    }
    else {
      Mission.find({useraccount:result.id}).sort({missionID:'ascending'}).exec(function(err,missionArray){
        var missionFinished=[];
        if(err){
          console.log("mission find error");
          console.log(err);
        }else{
           console.log(missionArray);
           missionArray.forEach(element=>missionFinished.push(element.missionID));
           return res.json({
            missionFinishedID: missionFinished,
          });
        }
        });
    }
  });
});

module.exports = router;
