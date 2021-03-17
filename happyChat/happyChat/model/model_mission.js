const mongoose = require('mongoose');

var MissionSchema = mongoose.Schema({
    missionID:{type:Number},
    topic:{type:String},
    description:{type:String},
    token:{type:Number},
    userAccount:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'}
});

var Mission = mongoose.model('Mission',MissionSchema);

module.exports = Mission;