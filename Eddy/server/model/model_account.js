const mongoose = require("mongoose");

//user account database model
var UserAccountSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  userProfile: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
  missionFinished: [{ type: Number }],  //list of mission finished
  report: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
  queue: { type: mongoose.Schema.Types.ObjectId, ref: "Queue" },
  token: { type: Number },
  online: { type: Boolean },  //online-offline status
});

var UserAccount = mongoose.model("UserAccount", UserAccountSchema);

module.exports = UserAccount;
