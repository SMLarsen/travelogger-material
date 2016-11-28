var express = require('express')
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var employees = require('./routes/employees');
var budgets = require('./routes/budgets');
var port = 3000;

// Middleware on ALL requests
app.use(bodyParser.json());
app.use(express.static('public/'));

// Routing modules
app.use('/employees', employees);
app.use('/budgets', budgets);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.listen(port, function() {
  console.log('http://localhost:' + port);
});
