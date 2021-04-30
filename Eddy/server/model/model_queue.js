const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

//queue database model
var QueueSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  userProfile: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
  userAccount:{ type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
  queueNumber: { type: Number },  //auto increment
  room: { type: String },   //chat room name
  //requirements
  requiredGender: { type: String },
  requiredUni: { type: String },
  requiredFaculty: { type: String },
  requiredYear: { type: Number },
  requiredStatus: { type: String },
});
autoIncrement.initialize(mongoose.connection);
//auto increment of queue number
QueueSchema.plugin(autoIncrement.plugin, { model: "Queue", field: "queueNumber", startAt: 1, incrementBy: 1 });

var Queue = mongoose.model("Queue", QueueSchema);

module.exports = Queue;
