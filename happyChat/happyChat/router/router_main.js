const express = require('express');
const router = express.Router();

router.get('/main', (req, res) => {
    res.send('running la');
})

module.exports = router;