const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const router = express.Router();
let UserAccount = require('../model/model_account.js');
let sendEmail = require('../send_email.js');

const { Mongoose } = require('mongoose');
const Mission = require('../original/model/model_mission.js');
router.get('/login', (req, res) => {
    res.send('running la');
})

router.post('/login',  (req, res) => {   //login
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    
    UserAccount.findOne({username:username},async function(error,user){
        /*loginstate:0 => can't find user
                     1 => password incorrect
                     2 => login successful
        */ 
    if(error){
        var data={
            'loginstate':0
        };
        console.log("can't find user");
        console.log(error);
        return res.json(data);
    }
    if(bcrypt.compareSync(password,user.password)){
        req.session.username=user.username;
        //res.redirect('/');
        var data={
            'loginstate':2
        };
       
        await Mission.exists({useraccount:user._id,missionID:0},function(err,exist){
            if(err){
                console.log(err);
            }else if(exist==false){
                var missionFinished= new UserAccount({
                    _id: new mongoose.Types.ObjectId(),
                    UserAccount: user._id,
                    missionID:0,
                    Name:'Daily Login',
                    Content:'Log in daily',
                    token:5
                });
                user.token+=5;
                user.save((err)=>{
                    if(err){
                        console.log(err);
                    }
                });
                missionFinished.save((error)=>{
                    if(error){
                        console.log("can't save");
                        console.log(error);
                    }else{
                        console.log("mission completed and saved");
                    }
                });
            }

            return ;
        });
        

        console.log("login successful");
        
        return res.json(data);
    }else{
        var data={
            'loginstate':1
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
})

router.post('/forgotpw', (req, res) => {    //forgot password
    var email = req.body.email;

    UserAccount.findOne({ email: email }, function(err, result) {
        if (err) {
            consolg.log(err);
            res.send('Account can\'t be found');
        }
        else {
            var randomPw = Math.random().toString(36).substr(8);
            var subject = 'Recovery of Your Happy Chat Account Password';
            var html = `<p>Your password is: </p><p><strong>${randomPw}</strong></p>`;
            sendEmail.sendEmail(email, subject, html);   //send email
            consolg.log('forgot password email sent');
        }
    });

})

module.exports = router;