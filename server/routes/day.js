var express = require('express');
var router = express.Router();
var day = require('../models/day');

// Route: Get days
router.get('/:id', function(req, res) {
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

// Route: Update a day general info
router.put('/general/:id', function(req, res) {
  console.log('update day general: ', req.body);
  var dayToUpdate = req.body;
  var update = {date: dayToUpdate.date, end_location: dayToUpdate.end_location, tag_line: dayToUpdate.tag_line, weather: dayToUpdate.weather};
  day.findByIdAndUpdate(req.params.id, update, function(err, data) {
      if(err) {
        console.log('Put ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: Update day route

// Route: Add a point of interest
router.put("/addpoi/:id", function(req, res) {
  console.log('Adding poi:', req.body);
  day.findByIdAndUpdate(
    {_id: req.params.id},
    { $push: {interesting_locations: { name: req.body.name, description: req.body.description}}},
     {safe: true, upsert: true},
    function(err, data) {
      if(err) {
        console.log('Add POI ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: PUT point of interest route

// Route: Update a point of interest
router.put("/updatepoi/:id/:index", function(req, res) {
  var index = req.params.index;
  console.log('Updating poi:', '\nid:', req.params.id, '\nindex:', index, '\nbody:', req.body);
  var query = {['interesting_locations.' + index + '.name'] : req.body.name, 
    ['interesting_locations.' + index + '.description']: req.body.description };
    console.log('query', query);
  day.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: query},
    //  {safe: true, upsert: true},
    function(err, data) {
      if(err) {
        console.log('Update POI ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: Update point of interest route

// Route: Delete a day POI
router.delete('/poi/:dayID/:poiID', function(req, res) {
  console.log('update day poi: ', req.param.dayID, req.param.poiID);
  day.findByIdAndUpdate(
    {_id: req.params.dayID},
    { $pull: {interesting_locations: { _id: req.params.poiID}}},
    function(err, data) {
      if(err) {
        console.log('Delete POI ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: Update day POI route

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
