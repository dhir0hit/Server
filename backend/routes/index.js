var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/check-connection', function(req, res, next) {
    let db = req.db;
    let collection = db.get('pwdmanager');

    collection.find({}, {}, function(error, docs) {
        if (error) {
            res.send('0');
        } else {
            res.send('1');
        }
    })
});

module.exports = router;
