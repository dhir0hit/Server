var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/get-all', function(req, res, next) {
    let db = req.db;
    let collection = db.get('pwdmanager');

    collection.find({}, {}, function(error, docs) {
        if (error) {
            next(error)
        } else {
            res.json(docs);
        }
    })
});


router.get('/account/:Id', function(req, res, next) {
    let db = req.db;
    let collection = db.get('pwdmanager');

    collection.findOne(
        {id: parseInt(req.params.id)},
        function (error, result) {
            if (error) {
                res.send('0');
            }
            res.json(result);
        })

//    res.send(req.params.id)
})


router.post('/create', function(req, res, next) {
    let db = req.db;
    let collection = db.get('pwdmanager');

    if (req.body.id &&
        req.body.username &&
        req.body.password &&
        req.body.platform)
    {
        collection.insert(
                {
                    id: parseInt(req.body.id),
                    username: req.body.username,
                    password: req.body.password,
                    platform: req.body.platform,
                    website: req.body.website,
                    additionalInfo: req.body.additionalInfo,
                    favorite: req.body.favorite,
                    createdOn: req.body.createdOn,
                    editedOn: req.body.editedOn
                },
                function (error, result) {
                    if (error) {
                        res.send('0');
                    } else {
                        res.send('1');
                    }
                }
        )
    } else {
        res.send('0');
    }

});

router.post('/update', function(req, res, next) {
    let db = req.db;
    let collection = db.get('pwdmanager');

    collection.update(
        {id: parseInt(req.body.id)},
        {$set: {
            username: req.body.username,
            password: req.body.password,
            platform: req.body.platform,
            website: req.body.website,
            additionalInfo: req.body.additionalInfo,
            favorite: req.body.favorite == 1 ? true : false,
            createdOn: req.body.createdOn,
            editedOn: req.body.editedOn
        }},
        function (error, result) {
            if (error) {
                res.send('0')
            }
            res.send('1')
        }
    )
});

router.post('/delete', function(req, res, next) {
    let db = req.db;
    let collection = db.get('pwdmanager');

    collection.remove(
        {id: parseInt(req.body.id)},
        function (error, result) {
            if (error) {
               res.send('0') ;
            }
            res.send('1');
        }
    )
});




module.exports = router;
