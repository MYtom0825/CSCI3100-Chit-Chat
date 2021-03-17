const express = require('express');
const router = express.Router();
let UserAccount = require('../model/model_account.js');
let VerifyingAccount = require('../model/model_verifyaccount.js');

router.get('/create/:id', (req, res) => {
    res.send('running la');

    VerifyingAccount.FindById(req.param.id, function(err, record) {
        if (err) {
            console.log(err);
        }
        else {
            //get the verified email, can pass the email to frontend???
        }
    })
})

router.post('/create/:id', (req, res) => {
    //insert into UserAccount
})

module.exports = router;