const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();
const nodemailer = require('nodemailer');
let UserAccount = require('../model/model_account.js');
let VerifyingAccount = require('../model/model_verifyaccount.js');

var transporter = nodemailer.createTransport({      //to be modified..
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword'
    }
});

router.get('/register', (req, res) => {
    res.send('running la');
})

function add(email) {
    const newAccount = new VerifyingAccount({
        _id: new mongoose.Types.ObjectID(),
        email: email
    });
    
    newAccount.save(function(err, record) {
        if(err){
            console.log('Account can\'t be save');
        }else{
            return newAccount._id;
        }
    })
}

function sendEmail(email, id) {
    var mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Verification of Your Happy Chat University Account',
        //tbc
        html: `<p>Please click to following link to create your own account!</p><p><a href="https://localhost:3000/create?id=${id}">Verify</a></p>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        }
        else {
        console.log('Email sent: ' + info.response);
        }
    });
}

router.post('/register', (req, res) => {
    var email = req.body.email;
    var pos = email.indexOf('@');

    if ( pos > -1 && email.includes('edu.hk', pos) ) {    // check if 'edu.hk' is included after @
        //check if email exist in UserAccount
        UserAccount.exists({ email: email }, function(err, result) {
            if (err) {
                console.log(err);
            }
            else if (result === true) {
                res.send('Account registered!');
            }
            else {
                //check if email exist in VerifyingAccount
                VerifyingAccount.exists({ email: email }, function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else if (result === true) {
                        res.send('Account Verifying!');
                    }
                    else {  //non exist email in mongodb
                        var id = add(email);    //get objectID
                        sendEmail(email, id);   //send email
                        res.send('verification email sent');
                    }
                });
            }
        });
    }
    else {
        res.send('Please input an university email address!');
    }
    res.end();
})

module.exports = router, nodemailer;