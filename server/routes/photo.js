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

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        key: function(req, file, cb) {
          // console.log('req:', req);
          // console.log('req.body:', req.body);
          console.log('file:', file);
            newPhoto.name = file.originalname;
            newPhoto.url = 'test name' + '/' + shortid.generate() + '_' + file.originalname;
            console.log('newPhotoURL:', newPhoto.url);
            cb(null, newPhoto.url);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read'
    })
});

//Route: Create album for traveller if needed
router.post('/', upload.array('file', 1), function(req, res, next) {
  console.log('post route req:', req.body);
    res.send('Here you are');
});


// Route: Add a detail
// router.post("/:id", function(req, res) {
//     console.log('id is:', req.params.id);
//     var dayID = req.params.id;
//     var detailToAdd = req.body;
//     console.log('Adding new detail:', dayID, detailToAdd);
//     day.findByIdAndUpdate(
//         dayID, {
//             $push: {
//                 "details": detailToAdd
//             }
//         }, {
//             safe: true,
//             upsert: true,
//             new: true
//         },
//         function(err, model) {
//             if (err) {
//                 console.log('There was an error adding day detail:', err);
//                 res.sendStatus(500);
//             } else {
//                 console.log("model:", model);
//                 res.send(model);
//             }
//         }
//     );
// }); // END: POST detail route

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
