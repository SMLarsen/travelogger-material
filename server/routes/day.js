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

// Route: Update a day general info
router.put('/general/:id', function(req, res) {
  console.log('update day general: ', req.body);
  var dayToUpdate = req.body;
  var update = {
    date: dayToUpdate.date,
    end_location: dayToUpdate.end_location,
    tag_line: dayToUpdate.tag_line,
    lodging_name: dayToUpdate.lodging_name,
    lodging_address: dayToUpdate.lodging_address,
    lodging_type: dayToUpdate.lodging_type,
    lodging_reference: dayToUpdate.lodging_reference,
    narrative: dayToUpdate.narrative, 
    weather: dayToUpdate.weather
  };
  day.findByIdAndUpdate(req.params.id,
    update, function(err, data) {
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
    ['interesting_locations.' + index + '.description'] : req.body.description };
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

// Route: Delete POI
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
}); // END: Delete POI route

// Route: Add a route
router.put("/addroute/:id", function(req, res) {
  console.log('Adding route:', req.body);
  day.findByIdAndUpdate(
    {_id: req.params.id},
    { $push: {routes: { name: req.body.name, distance: req.body.duration, transport_mode: req.body.transport_mode, specifics: req.body.specifics, comments: req.body.comments}}},
     {safe: true, upsert: true},
    function(err, data) {
      if(err) {
        console.log('Add Route ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: PUT route route

// Route: Update a route
router.put("/updateroute/:id/:index", function(req, res) {
  var index = req.params.index;
  console.log('Updating route:', '\nid:', req.params.id, '\nindex:', index, '\nbody:', req.body);
  var query = {['routes.' + index + '.name'] : req.body.name,
    ['routes.' + index + '.distance'] : req.body.distance,
    ['routes.' + index + '.duration'] : req.body.duration,
    ['routes.' + index + '.transport_mode'] : req.body.transport_mode,
    ['routes.' + index + '.specifics'] : req.body.specifics,
    ['routes.' + index + '.comments'] : req.body.comments };
    console.log('query', query);
  day.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: query},
    //  {safe: true, upsert: true},
    function(err, data) {
      if(err) {
        console.log('Update Route ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: Update route route

// Route: Delete Route
router.delete('/route/:dayID/:routeID', function(req, res) {
  console.log('delete route: ', req.param.dayID, req.param.routeID);
  day.findByIdAndUpdate(
    {_id: req.params.dayID},
    { $pull: {routes: { _id: req.params.routeID}}},
    function(err, data) {
      if(err) {
        console.log('Delete Route ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: Delete route route

// Route: Add a meal
router.put("/addmeal/:id", function(req, res) {
  console.log('Adding meal:', req.body);
  day.findByIdAndUpdate(
    {_id: req.params.id},
    { $push: {meals: { name: req.body.name, type: req.body.type, location: req.body.location, description: req.body.description, reference: req.body.reference}}},
     {safe: true, upsert: true},
    function(err, data) {
      if(err) {
        console.log('Add Route ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: PUT meal route

// Route: Update a meal
router.put("/updatemeal/:id/:index", function(req, res) {
  var index = req.params.index;
  console.log('Updating meal:', '\nid:', req.params.id, '\nindex:', index, '\nbody:', req.body);
  var query = {['meals.' + index + '.name'] : req.body.name,
    ['meals.' + index + '.type'] : req.body.type,
    ['meals.' + index + '.location'] : req.body.location,
    ['meals.' + index + '.description'] : req.body.description,
    ['meals.' + index + '.reference'] : req.body.reference };
    console.log('query', query);
  day.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: query},
    //  {safe: true, upsert: true},
    function(err, data) {
      if(err) {
        console.log('Update Meal ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: Update Meal route

// Route: Delete meal
router.delete('/meal/:dayID/:mealID', function(req, res) {
  console.log('delete meal: ', req.param.dayID, req.param.mealID);
  day.findByIdAndUpdate(
    {_id: req.params.dayID},
    { $pull: {meals: { _id: req.params.mealID}}},
    function(err, data) {
      if(err) {
        console.log('Delete Meal ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: Delete Meal route

// Route: Add a recommendation
router.put("/addrecommendation/:id", function(req, res) {
  console.log('Adding recommendation:', req.body);
  day.findByIdAndUpdate(
    {_id: req.params.id},
    { $push: {recommendations: { text: req.body.text }}},
     {safe: true, upsert: true},
    function(err, data) {
      if(err) {
        console.log('Add Recommendation ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: PUT recommendation route

// Route: Update a recommendation
router.put("/updaterecommendation/:id/:index", function(req, res) {
  var index = req.params.index;
  console.log('Updating recommendation:', '\nid:', req.params.id, '\nindex:', index, '\nbody:', req.body);
  var query = {['recommendations.' + index + '.text'] : req.body.text };
    console.log('query', query);
  day.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: query},
    //  {safe: true, upsert: true},
    function(err, data) {
      if(err) {
        console.log('Update Recommendation ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: Update Recommendation route

// Route: Delete recommendation
router.delete('/recommendation/:dayID/:recommendationID', function(req, res) {
  console.log('delete recommendation: ', req.param.dayID, req.param.mealID);
  day.findByIdAndUpdate(
    {_id: req.params.dayID},
    { $pull: {recommendations: { _id: req.params.mealID}}},
    function(err, data) {
      if(err) {
        console.log('Delete Recommendation ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
}); // END: Delete Recommendation route


module.exports = router;
