var mongoose = require('mongoose');
var connectionString = require('../config/database-config');

var databaseURI = '';
// process.env.MONGODB_URI will only be defined if you
// are running on Heroku
if (process.env.MONGODB_URI !== undefined) {
    // use the string value of the environment variable
    databaseURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    databaseURI = connectionString;
}

var connectToMongoDatabase = function() {
    mongoose.connect(databaseURI);

    // mongoose.set('debug', true);

    mongoose.connection.on('connected', function() {
        console.log('Mongoose connected to ', databaseURI);
    });

    mongoose.connection.on('error', function(err) {
        console.log('Mongoose failed to connect because error: ', err);
    });
};

module.exports = {
    connect: connectToMongoDatabase
};