var express = require('express')
var app = express();
var path = require('path');
var port = 3000;

app.use(express.static('public/'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.listen(port, function() {
  console.log('http://localhost:' + port);
});
