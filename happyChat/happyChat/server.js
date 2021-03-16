const express = require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose')
const app=express();


mongoose.connect('mongodb://localhost/happyChat');
var db=mongoose.connection;

db.on('error',console.error.log(console,'MongoDB connection failed'));
db.once('succeed',()=>{console.log('Successful connection')});

var UserAccountSchema=mongoose.Schema({
    userID:{type: Number,unique: true},
    username:{type:String,unique:true,require:true},
    password:{type:String,require:true},
    email:{type:String,unique:true,require:true},
    onOffstatus:{type:String}
});

var UserProfileSchema=mongoose.Schema({
    account:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    picture:{type:String},
    nickName:{type:String},
    gender:{type:String},
    university:{type:String},
    faculty:{type:String},
    major:{type:String},
    year:{type:Number},
    status:{type:String},
    interest:[{type:String}], //array of interests
    token:{type:Number},
    missionFinished:[{type:mongoose.Schema.Types.ObjectId,ref:"Mission"}],
    createdTime:{type:Date},
    contactType:{type:String},
    contact:{type:String}


});

var MissionSchema=mongoose.Schema({
    missionID:{type:Number},
    topic:{type:String},
    description:{type:String},
    token:{type:Number}
});

var UserAccount=mongoose.model('UserAccount',UserAccountSchema);
var UserProfile=mongoose.model('UserProfile',UserProfileSchema);
var Mission=mongoose.model('Mission',MissionSchema);
