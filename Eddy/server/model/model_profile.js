const mongoose = require("mongoose");

//user profile database model
var UserProfileSchema = mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
  picture: { type: String },
  nickName: { type: String },
  gender: { type: String, enum: ["Male", "Female"], default: "Male" },
  university: { type: String },
  faculty: { type: String },
  major: { type: String },
  year: { type: Number },
  status: { type: String },
  description: { type: String },
  interest: [{ type: String }], //array of interests
  createdTime: { type: Date },
  contact: { type: String },
});

var UserProfile = mongoose.model("UserProfile", UserProfileSchema);

module.exports = UserProfile;
