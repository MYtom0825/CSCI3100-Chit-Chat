const nodemailer = require('nodemailer');

let sender = 'xxx@gmail.com';
let pw = 'pw';

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
        subject: subject,
        html: html
    };
    console.log('Dhere??');
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
