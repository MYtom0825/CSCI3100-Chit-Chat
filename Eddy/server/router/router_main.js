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
    if(!req.session.username){
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
    }

    //set filters
    var filterGender = req.body.gender;
    var filterUni = req.body.uni;
    var filterMajor = req.body.major;
    var filterYear = req.body.year;
    var filterStatus = req.body.status;

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

    var userGender = profile.gender;
    var userUni = profile.uni;
    var userMajor = profile.major;
    var userYear = profile.year;
    var userStatus = profile.status;


    const matchUsers = Queue.find({     //find matched users which requirement match the current user
            $and: [
                { requiredGender: { userGender, $exists: true, $ne: [] } }, 
                { requiredUni: { userUni, $exists: true, $ne: [] } }, 
                { requiredMajor: { userMajor, $exists: true, $ne: [] } },
                { requiredYear: { userYear, $exists: true, $ne: [] } },
                { requiredStatus: { userStatus, $exists: true, $ne: [] } }
            ]
    }).populate('userProfile').populate('userAccount').sort({ queueNumber: 1 });

    if (matchUsers !== {}) {        //if there exist that current user matches the requirement of users in queue
        //check if matched user also satisfy current user's requirement
        matchUsers.forEach(element => {
            if ( (filterGender === null || element.userProfile.gender === filterGender) &&
                 (filterUni === null || element.userProfile.uni === filterUni) &&
                 (filterMajor === null || element.userProfile.major === filterMajor) &&
                 (filterYear === null || element.userProfile.year === filterYear) &&
                 (filterStatus === null || element.userProfile.status === filterStatus) )
            {
                let commonInterest = profile.interest.filter(x => element.userProfile.interest.includes(x));
                let quiz = getQuiz();

                let json = {
                    userId: [account._id, element.account._id],
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
                    room: element.room,
                };
                delQueue(element.account._id);      //del matched user in Queue
                console.log(json);
                res.json(json); //send 3 popup_quiz, ig, info(name, array of comment interest), chatroom
                
            }
        });
    }
    else {      //no matched user, keep waiting until new user matched current user
        console.log('no matched user');

        const newQueue = new Queue({            //save current user into queue to wait for matching
            _id: new mongoose.Types.ObjectId(),
            userAccount: account._id,
            room: Math.random().toString(36).substr(8),
            requiredGender: filterGender,
            requiredUni: filterUni,
            requiredMajor: filterMajor,
            requiredYear: filterYear,
            requiredStatus: filterStatus
        });

        newQueue.save(function(err, record) {
            if(err){
                console.log('Queue can\'t be save');
            }else{
                console.log('Queue saved');
                //keep waiting
                res.redirect('../loading');
            }
        })
    }
});

//popup quiz, after answered then send to backend.
//send common interest and ig and answer to frontend for broadcast...
//send 2 user_id to backend to notice ended chat

module.exports = router;
