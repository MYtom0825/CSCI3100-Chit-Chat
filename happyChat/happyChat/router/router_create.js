const express = require('express');
const router = express.Router();
let UserAccount = require('../model/model_account.js');

router.get('/create/:id', (req, res) => {
    res.send('running la');

    //x = mongoose.model('x', xSchema);
    x.FindById(req.param.id)
    .then()
    .catch(err => )
})

module.exports = router;