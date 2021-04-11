const mongoose = require('mongoose');

var UserProfileSchema = mongoose.Schema({
    account:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    picture:{type:String},
    nickName:{type:String},
    gender:{type:String,
            enum:["male","female"],
            default:"male",
    },
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

var UserProfile = mongoose.model('UserProfile',UserProfileSchema);

module.exports = UserProfile;