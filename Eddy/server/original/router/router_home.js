const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("running on main page");
})

module.exports = router;