const mongoose = require('mongoose');

var QueueSchema = mongoose.Schema({
    userAccount:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    queueNumber:{type:Number},
    requiredGender:{type:String},
    requiredUni:{type:String},
    requiredMajor:{type:String},
    requiredYear:{type:Number},
    requiredStatus:{type:String}
})

var Queue = mongoose.model('Queue',QueueSchema);

module.exports = Queue;