const express = require('express');
const router = express.Router();
let UserAccount = require('../model/model_account.js');
let Mission = require('../model/model_mission.js');

router.get('/mission:id', (req, res) => {
    res.send('running la');
    id = req.params.id;
    //show the progress of user's mission
})

module.exports = router;