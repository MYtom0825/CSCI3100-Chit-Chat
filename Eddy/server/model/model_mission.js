const mongoose = require('mongoose');

var MissionSchema = mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId},
    useraccount:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    missionID:{type:Number},
    Name:{type:String},
    Content:{type:String},
    token:{type:Number},
});

var Mission = mongoose.model('Mission',MissionSchema);

module.exports = Mission;