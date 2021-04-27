const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

var QueueSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  userProfile: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
  queueNumber: { type: Number },
  room: { type: String },
  requiredGender: { type: String },
  requiredUni: { type: String },
  requiredFaculty: { type: String },
  requiredYear: { type: Number },
  requiredStatus: { type: String },
});
autoIncrement.initialize(mongoose.connection);
QueueSchema.plugin(autoIncrement.plugin, { model: "Queue", field: "queueNumber", startAt: 1, incrementBy: 1 });

var Queue = mongoose.model("Queue", QueueSchema);

module.exports = Queue;
