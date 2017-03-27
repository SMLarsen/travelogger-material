require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var trip = require('./routes/trip');
var day = require('./routes/day');
var guest = require('./routes/guest');
var detail = require('./routes/detail');
var photo = require('./routes/photo');
var privateData = require('./routes/private-data');
var mongoConnection = require('./modules/mongo-connection');
var morgan          = require('morgan');
var methodOverride  = require('method-override');

// Middleware on ALL requests
app.use(express.static('public'));
app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});
app.use(bodyParser.json());

mongoConnection.connect();
require('./routes/routes.js')(app);

app.use("/guest", guest);

// Decodes the token in the request header and attaches the decoded token to the request.
app.use(decoder.token);

// Below here authenticated
// Route for privateData. The request gets here after it has been authenticated.
app.use("/privateData", privateData);

// Routing modules
app.use("/trip", trip);
app.use("/day", day);
app.use("/detail", detail);
app.use("/photo", photo);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Now listening on http://localhost:' + port);
});
