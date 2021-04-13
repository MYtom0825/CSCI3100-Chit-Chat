const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const mongoose = require('mongoose');
let UserAccount = require('../model/model_account.js');
let UserProfile = require('../model/model_profile.js');
let VerifyingAccount = require('../model/model_verifyaccount.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/registration/:id', (req, res) => {
    console.log("get!");
    res.send('running la');
});

async function getEmail(id) {
    VerifyingAccount.FindById(id, function (err, record) {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ email: record.email }); //send json data to frontend
        }
    });
}

router.post('/registration/:id',  async (req, res) => {
    //insert into UserAccount
    console.log("post!");
    var salt="";
    var hash="";
    try{
     salt= await bcrypt.genSaltSync(10);
    }catch(err){
        console.log("sssss");
        console.log(err);
        
    }

    try{
        hash = await bcrypt.hashSync(req.body.password,salt);
       }catch(err){
           console.log("xxxxxxx");
           console.log(err);
       }
    
    const user_id =  new mongoose.Types.ObjectId();
    const profile_id =  new mongoose.Types.ObjectId();
    var email = await getEmail(req.param.id);
    console.log("Ahere?!");
    var newUserAccount = new UserAccount({
        _id: user_id,
        email: email,
        username: req.body.username,
        password: hash,
        onOffstatus: 'off',
        userProfile: profile_id,
        token: 0
    });

    var newUserProfile = new UserProfile({
        _id: profile_id,
        account: user_id,
        picture: req.body.profilePic,
        nickName: req.body.profileName,
        gender: req.body.gender,
        university: req.body.university,
        faculty: req.body.faculty,
        major: req.body.major,
        year: req.body.year,
        status: req.body.status,
        interest: req.body.interest, //array of interests
        createdTime: Date.now(),
        contactType: req.body.contactType,  //ig/fb/... 
        contact: req.body.contact           //id
    });

    console.log("Bhere?!");
    try{
        await newUserAccount.save()
        console.log("user account successfully created");
    }catch(err){
        console.log("user account can't be created");
        console.log(err);
    }
    
    try{
        await newUserProfile.save()
        console.log("user profile successfully created");
    }catch(err){
        console.log("user profile can't be created");
        console.log(err);
    }
    
    return res.send("Created");
});

module.exports = router;