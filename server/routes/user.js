var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Route: Get user
router.get('/', function(req, res) {
  var userEmail = req.decodedToken.email;
  User.find({}, function(err, user) {
    if(err) {
      console.log('Get ERR: ', err);
      res.sendStatus(500);
    } else {
      console.log(user);
      res.send(user);
    }
  });
}); // END: GET user route

// Route: Register a new user
router.post("/", function(req, res) {
  var personToAdd = new User(req.body);
  personToAdd.save(function(err) {
      if (err) {
          console.log('There was an error inserting new user, ', err);
          res.sendStatus(500);
      } else {
          res.send(201);
      }
  });
}); // END: POST user route

module.exports = router;
