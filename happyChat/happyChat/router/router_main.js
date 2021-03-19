const express = require('express');
const router = express.Router();
let UserProfile = require('../model/model_profile.js');
let Queue = require('../model/model_queue.js');

router.get('/main', (req, res) => {
    res.send('running la');
})

function getProfile() {
    UserProfile.findOne({ username: req.session.username }, function(err, result) {
        if (err) {
            console.log(err);
            return [];
        }
        else {
            return result;
        }
    })
}
var profile = getProfile();

router.post('/match', (req, res) => {    //matching
    //insert into queue db
    if (account !== []) {
        const newQueue = new Queue({
            _id: new mongoose.Types.ObjectID(),
            userAccount: profile.account,
            //queueNumber: ,    //auto-increment...
            requiredGender: req.body.gender,
            requiredUni: req.body.uni,
            requiredMajor: req.body.major,
            requiredYear: req.body.year,
            requiredStatus: req.body.status
        });

        newQueue.save(function(err, record) {
            if(err){
                console.log('Queue can\'t be save');
            }else{
                console.log('Queue saved');
            }
        })
    }
    else {
        console.log('no account get');
    }
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

    const matchUsers = Queue.find({
                    $and: [
                        { requiredGender: { gender, $exists: true, $ne: [] } }, 
                        { requiredUni: { uni, $exists: true, $ne: [] } }, 
                        { requiredMajor: { major, $exists: true, $ne: [] } },
                        { requiredYear: { year, $exists: true, $ne: [] } },
                        { requiredStatus: { status, $exists: true, $ne: [] } }
                    ]
                    }).sort({ queueNumber: 1 });
    
    if (matchUsers !== {}) {
        //check the one being matched if his filter also satisfied
        matchUser.forEach(element => {
            if ( (element.requiredGender === null || profile.account.gender === element.requiredGender) &&
                 (element.requiredUni === null || profile.account.uni === element.requiredUni) &&
                 (element.requiredMajor === null || profile.account.major === element.requiredMajor) &&
                 (element.requiredYear === null || profile.account.year === element.requiredYear) &&
                 (element.requiredStatus === null || profile.account.status === element.requiredStatus) ) {
                res.json(element);
            }
            else {
                console.log('no matched user');
            }
        });
    }
})

module.exports = router;