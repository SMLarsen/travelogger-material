var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get("/", function(req, res) {
  if (req.decodedToken !== undefined) {
    var userEmail = req.decodedToken.email;
    console.log('Checking if user registered', userEmail);
    // Check the user's level of permision based on their email
    User.findOne({
        email: userEmail
      }, function(err, user) {
        if (err) {
            console.log('Error COMPLETING checking registered user query task', err);
            res.sendStatus(500);
        } else {
            console.log('Successful call to get user, user:', user);
            if (user === null) {
                // If the user is not in the database, register them to the database
                var newUser = { email: userEmail, clearanceLevel: 5 };
                console.log('user to add', newUser);
                var personToAdd = new User(newUser);
                // personToAdd.isNew = false;
                personToAdd.save(function(err, bob) {

                    if (err) {
                        console.log('There was an error inserting new user, ', err);
                        res.sendStatus(500);
                    } else {
                        console.log('New user added,', bob);
                        res.send(bob);
                    }

                });
            } else {
              res.sendStatus(200);
            }
        }
    });
  }
});

module.exports = router;
