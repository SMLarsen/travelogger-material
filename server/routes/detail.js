var express = require('express');
var router = express.Router();
var day = require('../models/day');
var mongoose = require('mongoose');

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
}); // END: DELETE day route

module.exports = router;
