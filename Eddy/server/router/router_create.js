const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
let UserAccount = require("../model/model_account.js");
let UserProfile = require("../model/model_profile.js");
let VerifyingAccount = require("../model/model_verifyaccount.js");
const mongoose = require("mongoose");
const cors = require("cors");

router.use(cors());

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/registration/:id", async (req, res) => {
  function getEmail() {
    VerifyingAccount.findByIdAndRemove({ _id: req.params.id }, function (err, record) {
      if (err) {
        console.log(err);
      } else {
        return record.email;
      }
    });
  }

  //insert into UserAccount
  const user_id = new mongoose.Types.ObjectId();
  const profile_id = new mongoose.Types.ObjectId();

  var salt="";
  var hash="";
  var email = '';

  try {
    email = await getEmail();
  }
  catch (err) {
    console.log(err);
  }
console.log(email);
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

  var newUserAccount = new UserAccount({
    _id: user_id,
    email: email,
    username: req.body.username,
    password: hash,
    onOffstatus: "off",
    userProfile: profile_id,
    token: 0,
  });

  var newUserProfile = new UserProfile({
    _id: profile_id,
    account: user_id,
    picture: req.body.profilePic,
    nickName: req.body.profileName,
    //gender: req.body.gender,
    university: req.body.university,
    faculty: req.body.faculty,
    major: req.body.major,
    year: req.body.year,
    status: req.body.status,
    interest: req.body.interest, //array of interests
    createdTime: Date.now(),
    contact: req.body.contact, //ig
  });

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
