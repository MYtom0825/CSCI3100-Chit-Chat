const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.send('running la');
})

router.post('/register', (req, res) => {
    var email = req.body.email;
    var pos = email.indexOf('@');

    if ( pos > -1 && email.includes('edu.hk', pos) ) {    // check if 'edu.hk' is included after @
        //send email...
    }
    else {
        res.send('Please input an university email address!');
    }
    res.end();
})

module.exports = router;