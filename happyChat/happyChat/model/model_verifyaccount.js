const mongoose = require('mongoose');

var VerifyingAccountSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    email: {type: String, unique: true, require: true},
    expire_at: {type: Date, default: Date.now, expires: 86400}
});

var VerifyingAccount = mongoose.model('VerifyingAccount',VerifyingAccountSchema);

module.exports = VerifyingAccount;