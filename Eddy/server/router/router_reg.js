const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
let UserAccount = require("../model/model_account.js");
let VerifyingAccount = require("../model/model_verifyaccount.js");
let sendEmail = require("../send_email.js");
const cors = require("cors");

router.use(cors());

router.post("/register", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  //check if email exist in UserAccount
  UserAccount.exists({ email: email }, function (err, result) {
    if (err) {
      console.log(err);
    } else if (result === true) {
      console.log("Email registered already!");
      res.send("Email registered already!");
    } else {
      //check if email exist in VerifyingAccount
      VerifyingAccount.exists({ email: email }, function (err, result) {
        if (err) {
          console.log(err);
        } else if (result === true) {
          console.log("Email is already verifying!");
          res.send("Email is already verifying!");
        } else {
          //non exist email in mongodb
          console.log(email);
          console.log(password);
          const newAccount = new VerifyingAccount({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: password,
          });

          newAccount.save(function (err, record) {
            if (err) {
              console.log("Account can't be saved");
              console.log(err);
            } else {
              console.log(`saved!!!   ${record._id}`);
              var id = record._id;
              var subject = "Verification of Your Chit Chat University Account";
              var html = `<p>Please click to following link to create your own account!</p><p><a href="http://localhost:3000/registration/${id}">http://localhost:3000/registration/${id}</a></p><p>Thanks</p><p>ChitChat Team</p>`;
              sendEmail.sendEmail(email, subject, html); //send email
              console.log("verification email sent");
              res.send("Email-verification has been sent to your University Email!");
            }
          });
        }
      });
    }
  });
});

module.exports = router;
