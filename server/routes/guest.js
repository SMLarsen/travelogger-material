var express = require('express');
var router = express.Router();
var trip = require('../models/trip');
var day = require('../models/day');

console.log('starting guest');

// Route: Get trip
router.get('/trip', function(req, res) {
    console.log('Getting trips');

    trip.find({
    }, function(err, trips) {
        if (err) {
            console.log('Get ERR: ', err);
            res.sendStatus(500);
        } else {
            console.log(trips);
            res.send(trips);
        }
    });
}); // END: GET trip route

// Route: Get days
router.get('/day/:id', function(req, res) {
  var tripId = req.params.id;
  console.log('Looking for days for', tripId);

  day.find({trip_id: tripId}, function(err, days) {
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
