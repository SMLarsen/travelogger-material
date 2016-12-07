var express = require('express');
var router = express.Router();
var trip = require('../models/trip');

console.log('Made it to trip');
// Route: Get trip
router.get('/', function(req, res) {
  // var tripEmail = req.decodedToken.email;
  trip.find({}, function(err, trips) {
    if(err) {
      console.log('Get ERR: ', err);
      res.sendStatus(500);
    } else {
      console.log(trips);
      res.send(trips);
    }
  });
}); // END: GET trip route

// Route: Register a new trip
// router.post("/", function(req, res) {
//   var personToAdd = new trip(req.body);
//   personToAdd.save(function(err) {
//       if (err) {
//           console.log('There was an error inserting new trip, ', err);
//           res.sendStatus(500);
//       } else {
//           res.send(201);
//       }
//   });
// }); // END: POST trip route

module.exports = router;
