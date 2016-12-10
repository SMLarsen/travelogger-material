var express = require('express');
var router = express.Router();
var day = require('../models/day');

// Route: Get days
router.get('/:id', function(req, res) {
  var dayId = req.params.id;
  console.log('Looking for days for', tripId);

  var queryParam = "{day_id: ObjectId(" + dayId + ")}";
  console.log('queryParam: ', queryParam);
  day.find(queryParam, function(err, days) {
    if(err) {
      console.log('Get ERR: ', err);
      res.sendStatus(500);
    } else {
      console.log(days);
      res.send(days);
    }
  });
}); // END: GET days route

// Route: Add a day
router.post("/", function(req, res) {
  var dayToAdd = new day(req.body);
  console.log('Adding new day:', dayToAdd);
  dayToAdd.save(function(err) {
      if (err) {
          console.log('There was an error inserting new day, ', err);
          res.sendStatus(500);
      } else {
          res.send(201);
      }
  });
}); // END: POST day route

module.exports = router;
