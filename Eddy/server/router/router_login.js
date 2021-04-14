const express = require("express");
const session=require('express-session');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const router = express.Router();
let UserAccount = require("../model/model_account.js");
let Mission = require("../model/model_mission.js");
let sendEmail = require("../send_email.js");
const cors = require("cors");
const store=new session.MemoryStore();
router.use(cors());

router.post("/login", (req, res) => {
  //login
  


  if(req.session.username){
    UserAccount.findOne({username:req.session.username}).populate("userProfile").exec(function(error,user){
      if (error) {
        console.log(err);
        res.send("fail");
        return;
      }else if (!user) {
        var data = {
          loginstate: 0,
        };
        console.log("can't find user req session ");
        return res.json(data);
      }else{
        user.onOffStatus = "on";

        var data = {
          loginstate: 2,
          name: user.userProfile.nickName,
          gender: user.userProfile.gender,
          picture: user.userProfile.picture,
          description: user.userProfile.description,
          faculty: user.userProfile.faculty,
          university: user.userProfile.university,
          year: user.userProfile.year,
          status: user.userProfile.status,
          interest: user.userProfile.interest,
          ig: user.userProfile.contact,
          token: user.token,
        };

        Mission.exists({ useraccount: user._id, missionID: 0 }, function (err, exist) {
          if (err) {
            console.log("mission exist error");
          } else if (exist == false) {
            var missionFinished = new Mission({
              _id: new mongoose.Types.ObjectId(),
              useraccount: user._id,
              missionID: 0,
              Name: "Daily Login",
              Content: "Log in daily",
              token: 5,
            });

            missionFinished.save((error) => {
              if (error) {
                console.log(error);
              }
            });
            user.token += 5;
            user.save((err) => {
              if (err) {
                console.log("token can't be added to the account");
              } else {
                console.log("token added to the account");
              }
            });
          } else if (exist == true) {
            console.log("mission completed before");
          }
        });

        console.log("login successful");
        return res.json(data);
      }
    });
  }else{
  console.log("log in");
  var email = req.body["email"];
  var password = req.body["password"];
  console.log(email);
  console.log(password);
  UserAccount.findOne({ email: email })
    .populate("userProfile")
    .exec(function (error, user) {
      /*loginstate:0 => can't find user
                     1 => password incorrect
                     2 => login successful
        */
      if (error) {
        console.log(err);
        res.send("fail");
        return;
      }
      if (!user) {
        var data = {
          loginstate: 0,
        };
        console.log("can't find user");
        return res.json(data);
      }

      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;
        req.session.save();
        console.log(req.session.username);

        console.log(req.session.id);

        var data = {
          loginstate: 2,
          name: user.userProfile.nickName,
          gender: user.userProfile.gender,
          picture: user.userProfile.picture,
          description: user.userProfile.description,
          faculty: user.userProfile.faculty,
          university: user.userProfile.university,
          year: user.userProfile.year,
          status: user.userProfile.status,
          interest: user.userProfile.interest,
          ig: user.userProfile.contact,
          token: user.token,
        };

        Mission.exists({ useraccount: user._id, missionID: 0 }, function (err, exist) {
          if (err) {
            console.log("mission exist error");
          } else if (exist == false) {
            var missionFinished = new Mission({
              _id: new mongoose.Types.ObjectId(),
              useraccount: user._id,
              missionID: 0,
              Name: "Daily Login",
              Content: "Log in daily",
              token: 5,
            });

            missionFinished.save((error) => {
              if (error) {
                console.log(error);
              }
            });
            user.token += 5;
            user.save((err) => {
              if (err) {
                console.log("token can't be added to the account");
              } else {
                console.log("token added to the account");
              }
            });
          } else if (exist == true) {
            console.log("mission completed before");
          }
        });

        console.log("login successful");
        return res.json(data);
      } else {
        var data = {
          loginstate: 1,
        };
        console.log("password incorrect");
        return res.json(data);
      }
    });
  }
  
});

router.post("/forgotpw", (req, res) => {
  //forgot password
  var email = req.body["email"];
  console.log(email);
  console.log("and");
  console.log(req.body.email);
  UserAccount.findOne({ email: email }, function (err, result) {
    if (err) {
      console.log(err);
      res.send("Account can't be found");
    } else {
      var subject = "Reset of Your Happy Chat Account Password";
      var html = `<p>Please click to following link to reset your password!</p><p><a href="http://localhost:3000/resetpw/${result._id}">Reset</a></p>`;
      sendEmail.sendEmail(email, subject, html); //send email
      console.log("forgot password email sent");
      res.send("Reset password email sent! Please check your email");
    }
  });
});

router.post("/resetpw/:id", async (req, res) => {
  var id = req.params.id;
  var pw = req.body["password"];

  var salt = "";
  var hash = "";

  try {
    salt = await bcrypt.genSaltSync(10);
  } catch (err) {
    console.log("sssss");
    console.log(err);
  }
  try {
    hash = await bcrypt.hashSync(pw, salt);
  } catch (err) {
    console.log("xxxxxxx");
    console.log(err);
  }

  UserAccount.findOneAndUpdate({ _id: id }, { password: hash }, function (err, result) {
    if (err) {
      console.log(err);
      res.send("Account can't be found");
    } else {
      res.send("Password has been reset!");
    }
  });
});

module.exports = router;
