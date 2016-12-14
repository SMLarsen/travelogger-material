var express = require('express');
var router = express.Router();
var trip = require('../models/trip');
var day = require('../models/day');


// Route: Get trip
router.get('/trip/:id', function(req, res) {
    var tripID = req.params.id;
    console.log('Getting single trip:', tripID);

    trip.find({ _id: tripID}).sort({begin_date: -1}).exec(
       function(err, trip) {
        if (err) {
            console.log('Get ERR: ', err);
            res.sendStatus(500);
        } else {
            console.log(trip);
            res.send(trip);
        }
    });
}); // END: GET trips route

// Route: Get trips
router.get('/trips', function(req, res) {
    console.log('Getting all trips');

    trip.find({}).sort({begin_date: -1}).exec(
       function(err, trips) {
        if (err) {
            console.log('Get ERR: ', err);
            res.sendStatus(500);
        } else {
            console.log(trips);
            res.send(trips);
        }
    });
}); // END: GET trips route

// Route: Get days
router.get('/day/:id', function(req, res) {
  var tripId = req.params.id;
  console.log('Getting days for', tripId);

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

module.exports = router;
