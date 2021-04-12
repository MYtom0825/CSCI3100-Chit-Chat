const express = require('express');
const mongoose=require('mongoose');
const router = express.Router();
let UserProfile = require('../model/model_profile.js');
let UserAccount = require('../model/model_account.js');
let Queue = require('../model/model_queue.js');
let Quiz = require('../model/model_quiz.js');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/main', (req, res) => {
    res.send('running la');
})

router.post('/match', (req, res) => {    //matching
    if(!username){
        return res.status(401).send();
    }

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

    function getQuiz() {
        Quiz.aggregate([{$sample:{size:3}}], function(err, result) {
            if(err) {
                console.log(err);
            }
            else {
                return result;
            }
        });
    }

    async function lookfor() {
        account = await getAccount();
        profile = await getProfile(account._id);
        quiz = await getQuiz();
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

    //set filters
    var gender = req.body.gender;
    var uni = req.body.uni;
    var major = req.body.major;
    var year = req.body.year;
    var status = req.body.status;

    var account;
    var profile;
    lookfor();
    
    function delQueue(id) {
        Queue.deleteOne({userAccount: id},function(err) {
            if(err){
                console.log(err);
            }else{
                console.log(`User ${id} deleted from the queue`);
            }
        });
    }

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
        matchUsers.forEach(element => {
            var profile=UserProfile.findById(element.user_id,function(err,result) {
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
                delQueue(element.account._id);      //del matched user in Queue
                delQueue(account._id);              //del user in Queue
                var matchedProfile = getProfile(element.account._id);
                let commonInterest = profile.interest.filter(x => matchedProfile.interest.includes(x));
                var roomID = Math.random().toString(36).substr(8);

                let json = {
                    //account: account,
                    questions: {
                        id: quiz.quizID,
                        question: quiz.question,
                        answer: [quiz.answer1, quiz.answer2],
                    },
                    contact: {
                        type: profile.contactType,
                        contact: profile.contact,
                    },
                    info: {
                        name: profile.nickname,
                        commonInterest: commonInterest,
                    },
                    room: roomID,
                };
                return res.json(json); //send 3 popup_quiz, ig, info(name, array of comment interest), chatroom
                
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
