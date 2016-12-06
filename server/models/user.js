var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    user: {
        type: String,
        required: true
    },
    clearance: {
        type: Integer,
        min: 0,
        max: 5,
        default: 0
        }
});

// user model
var User = mongoose.model('User', userSchema);

// Export model
module.exports = Person;
