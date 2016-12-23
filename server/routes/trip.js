var express = require('express');
var router = express.Router();
var trip = require('../models/trip');

// Route: Get trip
router.get('/:id', function(req, res) {
    var userId = req.params.id;
    console.log('Looking for trips for', userId);

    // db.getCollection('trips').find({user_id: ObjectId("5846e1b67ce266827e41dd32")})

    trip.find({user_id: userId}).sort({begin_date: 1}).exec(
      function(err, trips) {
        if (err) {
            console.log('Get ERR: ', err);
            res.sendStatus(500);
        } else {
            console.log(trips);
            res.send(trips);
        }
    });
}); // END: GET trip route

// Route: Add a trip
router.post("/", function(req, res) {
    var tripToAdd = new trip(req.body);
    console.log('Adding new trip:', tripToAdd);
    tripToAdd.save(function(err) {
        if (err) {
            console.log('There was an error inserting new trip, ', err);
            res.sendStatus(500);
        } else {
            res.send(201);
        }
    });
}); // END: POST trip route

// Route: Update a trip
router.put('/:id', function(req, res) {
  console.log('update trip: ', req.body);
  var tripToUpdate = req.body;
  var query = {_id: req.params.id};
  var update = {trip_name: tripToUpdate.trip_name, destination: tripToUpdate.destination, destination_location: tripToUpdate.destination_location, travellers: tripToUpdate.travellers, begin_date: tripToUpdate.begin_date, begin_location: tripToUpdate.begin_location, begin_map_location: tripToUpdate.begin_map_location, end_date: tripToUpdate.end_date, end_location: tripToUpdate.end_location, end_map_location: tripToUpdate.end_map_location};
  // { $set: { location: req.body.location, nicenessLevel: req.body.nicenessLevel} },
  trip.findByIdAndUpdate(req.params.id, update, function(err, data) {
      if(err) {
        console.log('Put ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }

  );
}); // END: Update trip route

// Route: Delete a trip
router.delete("/:id", function(req, res) {
    var tripToDelete = req.params.id;
    console.log('Deleting trip:', tripToDelete);
    trip.remove({
        _id: tripToDelete
    }, function(err) {
        if (err) {
            console.log('There was an error deleting trip:', err);
            res.sendStatus(500);
        } else {
            res.send(201);
        }
    });
}); // END: DELETE trip route



module.exports = router;
