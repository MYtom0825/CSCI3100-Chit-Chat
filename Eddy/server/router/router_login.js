const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
let UserAccount = require("../model/model_account.js");
let Mission = require('../model/model_mission.js');
let sendEmail = require("../send_email.js");
const cors = require("cors");

router.use(cors());


router.post("/login", (req, res) => {
  //login
  var email = req.body.email;
  var password = req.body.password;
  UserAccount.findOne({ email: email }).populate('userProfile').exec(function (error, user) {
    /*loginstate:0 => can't find user
                     1 => password incorrect
                     2 => login successful
        */
    if (error) {
      var data = {
        loginstate: 0,
      };
      console.log("can't find user");
      return res.json(data);
    }

    if (bcrypt.compareSync(password, user.password)) {
      req.session.username = user.username;
      user.onOffStatus = "on";

      var data = {
        loginstate: 2,
        name: user.userProfile.nickname,
        gender: user.userProfile.gender,
        picture: user.userProfile.picture,
        description: user.userProfile.description,
        faculty: user.userProfile.faculty,
        university: user.userProfile.university,
        year: user.userProfile.year,
        status: user.userProfile.status,
        interest: user.userProfile.interest,
        ig: user.userProfile.contact,
        token: user.token
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
          user.token+=5;
          user.save((err)=>{
            if(err){
              console.log("token can't be added to the account");
            }else{
              console.log("token added to the account");
            }
          })
        }else if(exist == true){
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

  /*if (username && email && password) {    // to be modified
        //connect to mongodb to check...
        if (true) { //login success
            request.session.loggedin = true;
      request.session.username = username;
      response.redirect('/');
        }
        else {  //login failed
            response.send('Incorrect Username and/or Password!');
            res.end();
        }
    }
    else {
        res.send('Please enter Username, Email and Password!');
        res.end();
    }*/
});

router.post("/forgotpw", (req, res) => {
  //forgot password
  var email = req.body.email;

  UserAccount.findOne({ email: email }, function (err, result) {
    if (err) {
      consolg.log(err);
      res.send("Account can't be found");
    } else {
      var randomPw = Math.random().toString(36).substr(8);
      
      var subject = "Recovery of Your Happy Chat Account Password";
      var html = `<p>Your password is: </p><p><strong>${randomPw}</strong></p>`;
      sendEmail.sendEmail(email, subject, html); //send email
      consolg.log("forgot password email sent");
    }
  });
});

module.exports = router;
