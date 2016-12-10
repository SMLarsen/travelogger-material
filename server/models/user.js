var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    clearanceLevel: {
        type: Number,
        required: true,
        default: 5,
        min: 0,
        max: 5
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

// user model
var User = mongoose.model('User', userSchema);

// Export model
module.exports = User;
