var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buddySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: ObjectId,
        required: true
    },
    hails_from: {
        type: String
    },
    country: {
        type: String
    },
    telephone: {
        type: String
    },
    email: {
        type: String
    },
    comment: {
        type: String
    }
});

// user model
var buddy = mongoose.model('buddy', buddySchema);

// Export model
module.exports = buddy;
