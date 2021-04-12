const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

var QueueSchema = mongoose.Schema({
    userAccount:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    queueNumber:{type:Number},
    requiredGender:{type:String},
    requiredUni:{type:String},
    requiredMajor:{type:String},
    requiredYear:{type:Number},
    requiredStatus:{type:String}
})
autoIncrement.initialize(mongoose.connection);
QueueSchema.plugin(autoIncrement.plugin, { model: 'Queue', field: 'queueNumber' ,startAt: 1, incrementBy:1});

var Queue = mongoose.model('Queue',QueueSchema);

module.exports = Queue;