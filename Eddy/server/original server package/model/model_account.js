const mongoose = require('mongoose');

var UserAccountSchema = mongoose.Schema({
    _id:{type: mongoose.Schema.Types.ObjectId,unique: true},
    username:{type:String,unique:true,require:true},
    password:{type:String,require:true},
    email:{type:String,unique:true,require:true},
    onOffstatus:{type:String},
    userProfile:{type:mongoose.Schema.Types.ObjectId,ref:'UserProfile'},
    misson:{type:mongoose.Schema.Types.ObjectId,ref:'Mission'},
    report:{type:mongoose.Schema.Types.ObjectId,ref:'Report'},
    queue:{type:mongoose.Schema.Types.ObjectId,ref:'Queue'}
});

var UserAccount = mongoose.model('UserAccount',UserAccountSchema);

module.exports = UserAccount;