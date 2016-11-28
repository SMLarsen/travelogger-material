var router = require('express').Router();
var pg = require('pg');
var config = require('../config/dbconfig');

var pool = new pg.Pool({
  database: config.database
});

// get
router.get('/', function(req, res) {
  pool.connect()
    .then(function(client) {
      // make query
      client.query(
        'SELECT * FROM budget_limits ORDER BY date_entered ASC')
        .then(function(result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function(err) {
          // error
          client.release();
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });
});
// post
router.post('/', function(req, res) {
  console.log('adding budget');
  var newBudget = req.body;
  // store in DB
  pool.connect()
    .then(function(client) {
      // make query
      client.query(
        'INSERT INTO budget_limits (monthly_limit) VALUES ($1)',
        [newBudget.monthly_limit])
        .then(function(result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function(err) {
          // error
          client.release();
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });
});

module.exports = router;
