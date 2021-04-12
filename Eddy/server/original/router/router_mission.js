const express = require('express');
const session = require('express-session');
const router = express.Router();
let UserAccount = require('../model/model_account.js');


router.use(session({secret:'random',resave:false,saveUninitialized:true}));

router.get('/mission', (req, res) => {
    //show the progress of user's mission
    if(!req.session.username){
        return res.status(401).send();
    }

    UserAccount.findOne({username:req.session.username},function(err,result){
         const missionFinished=[];
           if(err){
               res.send(err)
           }else{
              missionFinished=result.missionFinished;
              missionFinished.sort();
             return res.json({
                  missionFinishedID:missionFinished
              });
           }
    });
});

module.exports = router;