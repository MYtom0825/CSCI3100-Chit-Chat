const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const cors = require("cors");
let UserAccount = require("../model/model_account.js");
let UserProfile = require("../model/model_profile.js");

router.use(cors());

router.post("/account", (req, res) => {
  console.log("updating.....");
  //UserAccount.findOneAndUpdate({ });
  UserProfile.findOneAndUpdate({ username: req.session.username }, {
    nickname: req.body.name, 
    password: req.body.password,
    gender: req.body.gender, 
    picture: req.body.picture, 
    description: req.body.description,
    faculty: req.body.faculty, 
    university: req.body.university, 
    year: req.body.year, 
    status: req.body.status,
    interest: req.body.interest, 
    contact: req.body.ig
  }, function (err, result) {
    if (err) {
      console.log(err);
      res.send("update failed");
    }
    else {
      console.log("update success!");
      res.send("update successful");
    }
  });

});

module.exports = router;
