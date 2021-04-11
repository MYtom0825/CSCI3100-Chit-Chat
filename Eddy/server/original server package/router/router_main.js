const express = require('express');
const mongoose=require('mongoose');
const router = express.Router();
let UserProfile = require('../model/model_profile.js');
let UserAccount = require('../model/model_account.js');
let Queue = require('../model/model_queue.js');

router.use(express.json());
router.use(express.urlencoded());

router.get('/main', (req, res) => {
    res.send('running la');
})

router.post('/match', (req, res) => {    //matching
    //insert into queue db
    function getProfile(id) {
        UserProfile.findOne({ account: id }).populate('userProfile').exec(function(err, result) {
            if (err) {
                console.log(err);
                return [];
            }
            else {
                return result;
            }
        });
    }

    function getAccount() {
        UserAccount.findOne({username:req.session.username},function(err,result){
            if(err){
                console.log(err);
            }else{
                return result;
            }
        });
    }

    async function lookfor() {
        var account= await getAccount();
        var profile= await getProfile(account._id);
        if (profile !== []) {    //set new Queue with info inside profile
            const newQueue = new Queue({
                _id: new mongoose.Types.ObjectId(),
                userAccount: account._id,
                //queueNumber: ,    //auto-increment...
                requiredGender: gender,
                requiredUni: uni,
                requiredMajor: major,
                requiredYear: year,
                requiredStatus: status
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
            console.log('no profile get');
        }
    }

    //matcher's info
    var username = req.session.username;

    //set filters
    var gender = req.body.gender;
    var uni = req.body.uni;
    var major = req.body.major;
    var year = req.body.year;
    var status = req.body.status;

    if(!username){
        return res.status(401).send();
    }

    lookfor();
    
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
            var profile=UserProfile.findById(element.user_id,function(err,result){
                if(err){
                    console.log(err);
                }else{
                    console.log('User found!');
                    return result;
                }
            });
            if ( (element.requiredGender === null || profile.account.gender === element.requiredGender) &&
                (element.requiredUni === null || profile.account.uni === element.requiredUni) &&
                (element.requiredMajor === null || profile.account.major === element.requiredMajor) &&
                (element.requiredYear === null || profile.account.year === element.requiredYear) &&
                (element.requiredStatus === null || profile.account.status === element.requiredStatus) ) 
            {
                Queue.deleteOne({userAccount:element.user_id},function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('User deleted from the queue');
                    }
                });
                res.json(element);
                //send also 3 popup_quiz, ig, info(name, array of comment interest), chatroom
                //questions: [
                //{ id: "001", question: "Which food do you like more?", answer: ["Option A", "Option B"] },
                //{ id: "002", question: "Which animal do you like more?", answer: ["Option A", "Option B"] },
                //{ id: "003", question: "Which city do you like more?", answer: ["Option A", "Option B"] },
                //]
                //ig:
                //info: []
                //chatroom
                break;
            }
        });
    }
    else {
    console.log('no matched user');
    }
});

//popup quiz, after answered then send to backend.
//send common interest and ig and answer to frontend for broadcast...
//send 2 user_id to backend to notice ended chat

module.exports = router;
