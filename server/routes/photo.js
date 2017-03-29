/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const photo = require('../models/photo');
const mongoose = require('mongoose');
const shortid = require('shortid');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bucketName = process.env.AWSbucketName;
const href = process.env.AWShref;
const bucketUrl = href + bucketName + '/';
const day = require('../models/day');

/*******************
SET AWS CREDENTIALS
********************/
AWS.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId
});

AWS.config.apiVersions = {
    s3: '2006-03-01',
};

const s3 = new AWS.S3();

let newPhoto = {};
let deletedPhoto = {};

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        key: function(req, file, cb) {
            newPhoto.name = file.originalname;
            newPhoto.url = req.params.tripURL + '/' + req.params.dayURL + '/' + shortid.generate() + '_' + file.originalname;
            cb(null, newPhoto.url);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read'
    })
});

//Route: Create album for traveller if needed
router.post('/:tripURL/:dayURL', upload.array('file', 1), function(req, res, next) {
    console.log('post route req:', req.body);
    next();
});

// Route: Add a photo detail
router.post("/:tripURL/:dayURL", function(req, res, next) {
    newPhoto.url = bucketUrl + newPhoto.url;
    let dayID = req.body.day_id;
    newPhoto.detail_type = req.body.detail_type;
    newPhoto.description = req.body.description;
    newPhoto.icon = req.body.icon;
    console.log('Adding new photo detail:', dayID, newPhoto);
    day.findByIdAndUpdate(
        dayID, {
            $push: {
                "details": newPhoto
            }
        }, {
            safe: true,
            upsert: true,
            new: true
        },
        function(err, model) {
            if (err) {
                console.log('There was an error adding day photo detail:', err);
                res.sendStatus(500);
            } else {
                console.log("model:", model);
                res.send(model);
            }
        }
    );
}); // END: POST detail route

// Route: Delete a photo detail from DB
router.delete("/:dayID/:detailID/:url", function(req, res, next) {
    var dayID = req.params.dayID;
    var detailToDelete = req.params.detailID;
    console.log('Deleting detail:', detailToDelete);
    day.findByIdAndUpdate(
        dayID, {
            $pull: {
                "details": {
                    _id: detailToDelete
                }
            }
        }, {
            new: true
        },
        function(err, model) {
            if (err) {
                console.log('There was an error deleting day detail:', err);
                res.sendStatus(500);
            } else {
                console.log("model:", model);
                deletedPhoto = model;
                next();
            }
        }
    );
}); // END: DELETE detail route

// Route: Delete a photo from S3
router.delete("/:dayID/:detailID/:url", function(req, res, next) {
  let decodedURL = decodeURIComponent(req.params.url);
    console.log('Deleting from S3:', decodedURL);
    let params = {
        Bucket: bucketName,
        Key: decodedURL
    };
    s3.deleteObject(params, function(err, data) {
        if (err) {
            console.log('There was an error deleting your photo: ', err.message);
            res.sendStatus(400);
        }
        res.sendStatus(200);
    });

});

// Route: Update a detail
router.put("/:dayID/:detailID", function(req, res) {
    var dayID = req.params.dayID;
    var detailToUpdateID = req.params.detailID;
    var detailToUpdate = req.body;
    console.log('Updating detail:', detailToUpdate);
    day.update({
            '_id': dayID,
            'details._id': detailToUpdateID
        }, {
            '$set': {
                'details.$': detailToUpdate
            }
        },
        function(err, model) {
            if (err) {
                console.log('There was an error updating day detail:', err);
                res.sendStatus(500);
            } else {
                console.log("model:", model);
                res.send(model);
            }
        }
    );
}); // END: Update detail route

module.exports = router;
