/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const photo = require('../models/photo');
const mongoose = require('mongoose');
const shortid = require('shortid');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const albumBucketName = process.env.AWSalbumBucketName;
const href = process.env.AWShref;
const bucketUrl = href + albumBucketName + '/';

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

//Route: Create album for traveller if needed
router.post("/:userID/:albumID", function(req, res) {
  let userID = req.params.userID;
  if (userID = 'new') {
    
  }
});

// Route: Add a detail
router.post("/:id", function(req, res) {
    console.log('id is:', req.params.id);
    var dayID = req.params.id;
    var detailToAdd = req.body;
    console.log('Adding new detail:', dayID, detailToAdd);
    day.findByIdAndUpdate(
        dayID, {
            $push: {
                "details": detailToAdd
            }
        }, {
            safe: true,
            upsert: true,
            new: true
        },
        function(err, model) {
            if (err) {
                console.log('There was an error adding day detail:', err);
                res.sendStatus(500);
            } else {
                console.log("model:", model);
                res.send(model);
            }
        }
    );
}); // END: POST detail route

// Route: Delete a detail
router.delete("/:dayID/:detailID", function(req, res) {
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
                res.send(model);
            }
        }
    );
}); // END: DELETE detail route

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
