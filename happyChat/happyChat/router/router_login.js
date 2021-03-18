const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
let UserAccount = require('../model/model_account.js');

router.get('/login', (req, res) => {
    res.send('running la');
})

router.post('/login', (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    
    UserAccount.findOne({username:username},function(error,user){
        /*loginstate:0 => can't find user
                     1 => password incorrect
                     2 => login successful
        */ 
    if(err){
        var data={
            'loginstate':0
        };
        res.json(data);
    }
    if(bcrypt.compareSync(password,user.password)){
        req.session.loggedin=true;
        req.session.username=username;
        //res.redirect('/');
        var data={
            'loginstate':2
        }
        res.json(data);
    }else{
        var data={
            'loginstate':1
        }
        res.json(data);
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

module.exports = router;