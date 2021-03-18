const express = require('express');
const router = express.Router();
const session = require('express-session');
let UserAccount = require('../model/model_account.js');
let Queue = require('../model/model_queue.js');

router.get('/main', (req, res) => {
    res.send('running la');
})

router.post('/match', (req, res) => {    //matching
    //insert into queue db
})

router.post('/match', (req, res) => {   //filter
    //matcher's info
    var username = req.session.username;

    //set filters
    var gender = req.body.gender;
    var uni = req.body.uni;
    var major = req.body.major;
    var year = req.body.year;
    var status = req.body.status;

    Queue.find({
        $and: [
            { requiredGender: { gender, $exists: true, $ne: [] } }, 
            { requiredUni: { uni, $exists: true, $ne: [] } }, 
            { requiredMajor: { major, $exists: true, $ne: [] } },
            { requiredYear: { year, $exists: true, $ne: [] } },
            { requiredStatus: { status, $exists: true, $ne: [] } }
        ]
    }).sort({ queueNumber: 1 }).exec(function(err, result) {
        if (err) {
            console.log(err);
        }
        else if (result !== {}) {
            //check the one being matched if his filter also satisfied
        }
    })
})

module.exports = router;