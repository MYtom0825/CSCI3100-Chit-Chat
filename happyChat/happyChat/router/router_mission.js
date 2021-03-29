const express = require('express');
const router = express.Router();
let UserAccount = require('../model/model_account.js');
const UserProfile = require('../model/model_profile.js');

router.use(session({secret:'random',resave:false,saveUninitialized:true}));

router.get('/mission', (req, res) => {
    //show the progress of user's mission
    if(!req.session.username){
        return res.status(401).send();
    }

    UserAccount.findOne({username:req.session.username},function(err,result){
           if(err){
               res.send(err)
           }else{
               UserProfile.findById(result._id).populate('missionFinished').exec(function(err,missions){
               if(err){
                   res.send(err);
               }else{
                console.log('Json structure of an array data is sent.');
                 res.json(JSON.stringify(missions));
               }
               });
           }
    });
});

module.exports = router;