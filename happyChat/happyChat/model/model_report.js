const mongoose = require('mongoose');

var ReportSchema = mongoose.Schema({
    userAccount:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    reporterID:{type:Number},
    reportedID:{type:Number},
    reason:{type:String},
    speakerID:{type:Number},
    text:{type:String},
    time:{type:Date}
})

var Report = mongoose.model('Report',ReportSchema);

module.exports = Report;