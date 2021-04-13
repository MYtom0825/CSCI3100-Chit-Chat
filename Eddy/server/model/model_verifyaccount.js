const mongoose = require('mongoose');

var VerifyingAccountSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    username: {type: String, unique: true, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    expire_at: {type: Date, default: Date.now, expires: 86400}
});

var VerifyingAccount = mongoose.model('VerifyingAccount',VerifyingAccountSchema);

module.exports = VerifyingAccount;