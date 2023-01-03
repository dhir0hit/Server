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

    console.log();
    console.log(`[*] Create Account request created`)

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
                        console.log(`[-] Create Account failed \nlog:${error}`)
                        res.send('0');
                    } else {
                        console.log(`[+] Created Account with id:${req.body.id}`)
                        res.send('1');
                    }
                }
        )
    } else {
        res.send('0');
        console.log(`[-] Create Account failed \nlog:Missing Credentials`)
    }
    console.log();
});

router.post('/update', function(req, res, next) {
    let db = req.db;
    let collection = db.get('pwdmanager');

    console.log();
    console.log(`[*] Update request for id:${req.body.id} created`)

    collection.update(
        {id: parseInt(req.body.id)},
        {$set: {
            username: req.body.username,
            password: req.body.password,
            platform: req.body.platform,
            website: req.body.website,
            additionalInfo: req.body.additionalInfo,
            favorite: req.body.favorite,
            createdOn: req.body.createdOn,
            editedOn: req.body.editedOn
        }},
        function (error, result) {
            if (error) {
                res.send('0');
                console.log(`[-] Update Account Faliure with id:${req.body.id} \nlog:${error}`);
            } else{ 
                res.send('1');
                console.log(`[+] Updated Acount id:${req.params.id}`)
            }
        }
    )
    console.log();
});

router.post('/delete', function(req, res, next) {
    let db = req.db;
    let collection = db.get('pwdmanager');

    console.log();
    console.log(`[*] Delete request for id:${req.body.id} created`)

    collection.remove(
        {id: parseInt(req.body.id)},
        function (error, result) {
            if (error) {
                console.log(`[-] Delete Account Faliure id:${req.body.id} \nlog:${error}`)
                res.send('0') ;
            } else {
                console.log(`[+] Deleted Acount id:${req.body.id}`);
                res.send('1');
            }
        }
    )
    console.log();
});




module.exports = router;
