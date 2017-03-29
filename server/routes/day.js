/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const day = require('../models/day');
const shortid = require('shortid');

// Route: Get days
router.get('/all/:id', function(req, res) {
    let tripId = req.params.id;
    console.log('Looking for days for', tripId);

    day.find({
        trip_id: tripId
    }).sort({
        date: 1
    }).exec(function(err, days) {
        if (err) {
            console.log('Get days ERR: ', err);
            res.sendStatus(500);
        } else {
            // console.log(days);
            res.send(days);
        }
    });
}); // END: GET days route

// Route: Get user's days
router.get('/user/:id', function(req, res) {
    let userId = req.params.id;
    console.log('Looking for days for', userId);

    day.find({
        user_id: userId
    }).sort({
        date: -1
    }).exec(function(err, days) {
        if (err) {
            console.log('Get days ERR: ', err);
            res.sendStatus(500);
        } else {
            // console.log(days);
            res.send(days);
        }
    });
}); // END: GET user's days route

// Route: Get a day
router.get('/one/:id', function(req, res) {
    let dayId = req.params.id;
    console.log('Looking for day for', dayId);
    day.find({
        _id: dayId
    }).exec(
        function(err, day) {
            if (err) {
                console.log('Get days ERR: ', err);
                res.sendStatus(500);
            } else {
                // console.log(day);
                res.send(day);
            }
        });
}); // END: GET a day route

// Route: Add a day
router.post('/', function(req, res) {
    let dayToAdd = new day(req.body);
    dayToAdd.album_url = shortid.generate();
    dayToAdd.save(function(err, objectInserted) {
        if (err) {
            console.log('There was an error inserting new day, ', err);
            res.sendStatus(500);
        } else {
            console.log('objectInserted:', objectInserted);
            res.send(objectInserted);
        }
    });
}); // END: POST day route

// Route: Update a day
router.put('/', function(req, res) {
    console.log('update day: ', req.body);
    let dayToUpdate = req.body;
    let query = {
        _id: dayToUpdate._id
    };
    let update = {
        date: dayToUpdate.date,
        end_location: dayToUpdate.end_location,
        end_map_location: dayToUpdate.end_map_location,
        tag_line: dayToUpdate.tag_line,
        narrative: dayToUpdate.narrative,
        album_url: dayToUpdate.album_url,
        cover_photo_url: dayToUpdate.cover_photo_url,
        weather: dayToUpdate.weather
    };
    const options = {
      new: true,
      upsert: true
    };
    day.findByIdAndUpdate(query, update, options, function(err, data) {
        if (err) {
            console.log('Put ERR: ', err);
            res.sendStatus(500);
        } else {
          console.log('day updated', data);
            res.send(data);
        }
    });
}); // END: Update day route

// Route: Delete a day
router.delete("/one/:id", function(req, res) {
    let dayToDelete = req.params.id;
    console.log('Deleting day:', dayToDelete);
    day.remove({
        _id: dayToDelete
    }, function(err) {
        if (err) {
            console.log('There was an error deleting day:', err);
            res.sendStatus(500);
        } else {
            res.send(201);
        }
    });
}); // END: DELETE day route

// Route: Delete all days for a trip
router.delete("/trip/:id", function(req, res) {
    let tripDaysToDelete = req.params.id;
    console.log('Deleting days for trip:', tripDaysToDelete);
    day.remove({
        trip_id: tripDaysToDelete
    }, function(err) {
        if (err) {
            console.log('There was an error deleting days for trip:', err);
            res.sendStatus(500);
        } else {
            res.send(201);
        }
    });
}); // END: DELETE all days for a trip

module.exports = router;
