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
  var happy = JSON.stringify(req.body);
  console.log(happy);
  var n = happy.indexOf("interest");
  var happy2 = happy.slice(0, n + 8) + happy.slice(n + 10);
  happy = JSON.parse(happy2).interest;

  const existdUserName = await UserAccount.findOne({ username: req.body.username });
  if (existdUserName) {
    return res.send("username taken");
  } else {
    VerifyingAccount.findByIdAndRemove({ _id: req.params.id }, async function (err, record) {
      if (err) {
        console.log(err);
      } else {
        //insert into UserAccount
        const user_id = new mongoose.Types.ObjectId();
        const profile_id = new mongoose.Types.ObjectId();

        var salt = "";
        var hash = "";

        console.log(record.email);
        console.log(record.password);
        try {
          salt = await bcrypt.genSaltSync(10);
        } catch (err) {
          console.log("sssss");
          console.log(err);
        }
        try {
          hash = await bcrypt.hashSync(record.password, salt);
        } catch (err) {
          console.log("xxxxxxx");
          console.log(err);
        }

        var newUserAccount = new UserAccount({
          _id: user_id,
          email: record.email,
          username: req.body.username,
          password: hash,
          userProfile: profile_id,
          token: 0,
        });
        console.log(req.body.interest);
        var newUserProfile = new UserProfile({
          _id: profile_id,
          account: user_id,
          picture: req.body.profilePic,
          nickName: req.body.nickName,
          gender: req.body.gender,
          university: req.body.university,
          faculty: req.body.faculty,
          major: req.body.major,
          year: req.body.year,
          status: req.body.status,
          description: req.body.desc,
          interest: happy, //array of interests
          createdTime: Date.now(),
          contact: req.body.contact, //ig
        });

        try {
          await newUserAccount.save();
          console.log("user account successfully created");
        } catch (err) {
          console.log("user account can't be created");
          console.log(err);
        }

        try {
          await newUserProfile.save();
          console.log("user profile successfully created");
        } catch (err) {
          console.log("user profile can't be created");
          console.log(err);
        }

        return res.send("Created");
      }
    });
  }
});

module.exports = router;
