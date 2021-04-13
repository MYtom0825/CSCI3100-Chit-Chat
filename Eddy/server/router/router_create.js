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

router.get("/registration/:id", (req, res) => {
  res.send("running la");

  VerifyingAccount.FindById(req.param.id, function (err, record) {
    if (err) {
      console.log(err);
    } else {
      res.send({ email: record.email }); //send json data to frontend
    }
  });
});

router.post("/registration/:id", (req, res) => {
  //insert into UserAccount
  const hash = bcrypt.hash(req.body.password, 10);
  const user_id = new mongoose.Types.ObjectId();
  const profile_id = new mongoose.Types.ObjectId();

  var newUserAccount = new UserAccount({
    _id: user_id,
    email: req.body.email,
    username: req.body.password,
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
    gender: req.body.gender,
    university: req.body.university,
    faculty: req.body.faculty,
    major: req.body.major,
    year: req.body.year,
    status: req.body.status,
    interest: req.body.interest, //array of interests
    createdTime: Date.now(),
    contactType: req.body.contactType, //ig/fb/...
    contact: req.body.contact, //id
  });

  newUserAccount.save(function (err, result) {
    if (err) {
      console.log("New account can't be created");
    } else {
      console.log("user account successfully created");
    }
  });

  newUserProfile.save(function (err, result) {
    if (err) {
      console.log("New profile can't be created");
    } else {
      console.log("user profile successfully created");
    }
  });
});

module.exports = router;
