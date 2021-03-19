const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
let UserAccount = require('../model/model_account.js');
let VerifyingAccount = require('../model/model_verifyaccount.js');
const mongoose = require('mongoose');

router.use(express.json());
router.use(express.urlencoded());

router.get('/create/:id', (req, res) => {
    res.send('running la');

    VerifyingAccount.FindById(req.param.id, function(err, record) {
        if (err) {
            console.log(err);
        }
        else {
            var userEmail={
                'email':record.email
            };
            res.json(userEmail); //send json data to frontend
        }
    })
});

router.post('/create/:id', (req, res) => {
    //insert into UserAccount
    if(req.body.password==null){
        console.log('password is empty');
    }else{
    const hash = bcrypt.hash(req.body.password,10);
    var newUserAccount = new UserAccount({
            _id: new mongoose.Types.ObjectId(),
            email : req.body['email'],
            username: req.body.password,
            password: hash
            });
     
    newUserAccount.save(function(err){
      if(err){
          console.log('New account can\'t be created');
      }else{
          res.send(result);
      }
    });
}
});

module.exports = router;