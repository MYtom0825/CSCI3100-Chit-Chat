const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

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

router.post('/register', (req, res) => {
    var email = req.body.email;
    var pos = email.indexOf('@');

    if ( pos > -1 && email.includes('edu.hk', pos) ) {    // check if 'edu.hk' is included after @
        //send email...
        var id = mongodb object id; //tbc
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
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
    }
    else {
        res.send('Please input an university email address!');
    }
    res.end();
})

module.exports = router;