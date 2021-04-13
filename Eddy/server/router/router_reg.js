const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
let UserAccount = require('../model/model_account.js');
let VerifyingAccount = require('../model/model_verifyaccount.js');
let sendEmail = require('../send_email.js');

router.get('/register', (req, res) => {
    console.log('running la');
})

router.post('/register', (req, res) => {
    var email = req.body.email;
    console.log(email);
    //check if email exist in UserAccount
    UserAccount.exists({ email: email }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else if (result === true) {
            console.log('Account registered!');
        }
        else {
            //check if email exist in VerifyingAccount
            VerifyingAccount.exists({ email: email }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else if (result === true) {
                    console.log('Account Verifying!');
                }
                else {  //non exist email in mongodb
                    console.log(email);
                    const newAccount = new VerifyingAccount({
                        _id: new mongoose.Types.ObjectId(),
                        email: email
                    });
                
                    newAccount.save(function (err, record) {
                        if (err) {
                            console.log('Account can\'t be saved');
                        } else {
                            console.log(`saved!!!   ${record._id}`);
                            var id = record._id;
                            var subject = 'Verification of Your Happy Chat University Account';
                            var html = `<p>Please click to following link to create your own account!</p><p><a href="https://localhost:5000/registration?id=${id}">Verify</a></p>`;
                            sendEmail.sendEmail(email, subject, html);   //send email
                            console.log('verification email sent');
                        }
                    });
                    
                }
            });
        }
    });
    res.end();
})

module.exports = router;