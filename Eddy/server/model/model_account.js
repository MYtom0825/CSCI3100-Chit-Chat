const mongoose = require('mongoose');

var UserAccountSchema = mongoose.Schema({
    _id:{type: mongoose.Schema.Types.ObjectId},
    username:{type:String,unique:true,require:true},
    password:{type:String,require:true},
    email:{type:String,unique:true,require:true},
    matchedUser:{type:mongoose.Schema.Types.ObjectId,ref:'UserProfile'},
    userProfile:{type:mongoose.Schema.Types.ObjectId,ref:'UserProfile'},
    missionFinished:[{type:Number}],
    report:{type:mongoose.Schema.Types.ObjectId,ref:'Report'},
    queue:{type:mongoose.Schema.Types.ObjectId,ref:'Queue'},
    token:{type:Number}
});

var UserAccount = mongoose.model('UserAccount',UserAccountSchema);

module.exports = UserAccount;