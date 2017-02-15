var express = require('express');
var router = express.Router();
var day = require('../models/day');

// Route: Get days
router.get('/all/:id', function(req, res) {
  var tripId = req.params.id;
  console.log('Looking for days for', tripId);

  day.find({trip_id: tripId}).sort({date: 1}).exec(function(err, days) {
    if(err) {
      console.log('Get days ERR: ', err);
      res.sendStatus(500);
    } else {
      console.log(days);
      res.send(days);
    }
  });
}); // END: GET days route

// Route: Get user's days
router.get('/user/:id', function(req, res) {
  var userId = req.params.id;
  console.log('Looking for days for', userId);

  day.find({user_id: userId}).sort({date: -1}).exec(function(err, days) {
    if(err) {
      console.log('Get days ERR: ', err);
      res.sendStatus(500);
    } else {
      console.log(days);
      res.send(days);
    }
  });
}); // END: GET user's days route

// Route: Get a day
router.get('/one/:id', function(req, res) {
  var dayId = req.params.id;
  console.log('Looking for day for', dayId);
  day.find({_id: dayId}).exec(
    function(err, day) {
    if(err) {
      console.log('Get days ERR: ', err);
      res.sendStatus(500);
    } else {
      console.log(day);
      res.send(day);
    }
  });
}); // END: GET a day route

// Route: Add a day
router.post("/", function(req, res) {
  var dayToAdd = new day(req.body);
  console.log('Adding new day:', dayToAdd);
  dayToAdd.save(function(err, objectInserted) {
      if (err) {
          console.log('There was an error inserting new day, ', err);
          res.sendStatus(500);
      } else {
          res.send(objectInserted);
      }
  });
}); // END: POST day route

// Route: Delete a day
router.delete("/one/:id", function(req, res) {
  var dayToDelete = req.params.id;
  console.log('Deleting day:', dayToDelete);
  day.remove({ _id: dayToDelete }, function(err) {
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
  var tripDaysToDelete = req.params.id;
  console.log('Deleting days for trip:', tripDaysToDelete);
  day.remove({ trip_id: tripDaysToDelete }, function(err) {
      if (err) {
          console.log('There was an error deleting days for trip:', err);
          res.sendStatus(500);
      } else {
          res.send(201);
      }
  });
}); // END: DELETE all days for a trip

module.exports = router;
