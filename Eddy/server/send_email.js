const nodemailer = require('nodemailer');

let sender = 'chitchatgpc3@gmail.com';
let pw = 'chitchat1230123';

var transporter = nodemailer.createTransport({      //to be modified..
    service: 'gmail',
    auth: {
        user: sender,
        pass: pw
    }
});

function sendEmail(email, subject, html) {
    var mailOptions = {
        from: sender,
        to: email,
        cc: sender,
        subject: subject,
        html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { sendEmail };
