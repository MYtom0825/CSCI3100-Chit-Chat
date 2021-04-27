const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const router = express.Router();
let UserAccount = require("../model/model_account.js");
let Mission = require("../model/model_mission.js");
let sendEmail = require("../send_email.js");
const cors = require("cors");
router.use(cors());

router.post("/login", (req, res) => {
  //login

  if (req.session.username) {
    UserAccount.findOne({ username: req.session.username })
      .populate("userProfile")
      .exec(function (error, user) {
        if (error) {
          console.log(err);
          res.send("fail");
          return;
        } else if (!user) {
          var data = {
            loginstate: 0,
          };
          console.log("can't find user req session ");
          return res.json(data);
        } else {
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
  } else {
    var email = req.body["email"];
    var password = req.body["password"];
    UserAccount.findOne({ email: email })
      .populate("userProfile")
      .exec(function (error, user) {
        /*loginstate:0 => can't find user
                     1 => password incorrect
                     2 => login successful
                     3 => someone is using the account
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
        if (user.online) {
          var data = {
            loginstate: 3,
          };
          return res.json(data);
        }
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.username = user.username;

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
          user.online = true;
          user.save();
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
  var newPw = Math.random().toString(36).substr(8);
  var salt = "";
  var hash = "";

  try {
    salt = bcrypt.genSaltSync(10);
  } catch (err) {
    console.log("sssss");
    console.log(err);
  }
  try {
    hash = bcrypt.hashSync(newPw, salt);
  } catch (err) {
    console.log("xxxxxxx");
    console.log(err);
  }

  console.log(email);
  console.log("and");
  console.log(req.body.email);
  UserAccount.findOneAndUpdate({ email: email }, { password: hash }, function (err, result) {
    if (err) {
      console.log(err);
      res.send("Account can't be found");
    } else {
      var subject = "Recovery of Your Happy Chat Account Password";
      var html = `<p>The following is your new password!</p><p><strong>${newPw}</strong></p>`;
      sendEmail.sendEmail(email, subject, html); //send email
      console.log("forgot password email sent");
      res.send("Your new password has sent to your email! Please check your email.");
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

router.post("/changetoken", (req, res) => {
  var username = req.body.username;
  var token = req.body.token;

  UserAccount.findOneAndUpdate({ username: username }, { token: token }, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  res.send("HaHa");
});

router.get("/logout", (req, res) => {
  var username = req.query.username;

  UserAccount.findOneAndUpdate({ username: username }, { online: false }, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  res.send("HaHa");
});

module.exports = router;
