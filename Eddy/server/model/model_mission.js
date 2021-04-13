const mongoose = require('mongoose');

var MissionSchema = mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId},
    useraccount:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    finishedDate:{type:Date,index:{expires:'720m'},default:Date.now()},
    missionID:{type:Number},
    Name:{type:String},
    Content:{type:String},
    token:{type:Number},
});

var Mission = mongoose.model('Mission',MissionSchema);

module.exports = Mission;