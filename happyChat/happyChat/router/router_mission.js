const express = require('express');
const session = require('express-session');
const router = express.Router();
let UserAccount = require('../model/model_account.js');
let Mission = require('../model/model_mission.js');

router.get('/mission', (req, res) => {
    res.send('running la');
    id = req.session.id;
    //show the progress of user's mission
})

module.exports = router;