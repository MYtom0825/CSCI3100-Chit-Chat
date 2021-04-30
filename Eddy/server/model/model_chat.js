const mongoose = require("mongoose");

var ChatSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  user1: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount", require: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount", require: true },
  room: { type: String, unique: true, require: true },
  user1entered: { type: Boolean },
  user2entered: { type: Boolean },
  chatHistory:[{speaker:String,text:String}],
  finished: { type: Boolean },

});

var Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
