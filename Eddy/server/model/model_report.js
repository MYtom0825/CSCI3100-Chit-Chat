const mongoose = require('mongoose');

//report database model
var ReportSchema = mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    userAccount:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    reporterID:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    reportedID:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    reason:{type:String},
    text:[{type:String}],   //chat record
    time:{type:Date}    //reporting time
})

var Report = mongoose.model('Report',ReportSchema);

module.exports = Report;