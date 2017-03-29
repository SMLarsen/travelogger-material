var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;
var tripSchema = new Schema({
    user_id: {
      type: ObjectId
    },
    trip_name: {
        type: String,
        required: true
    },
    destination: {
        type: String
    },
    destination_location: {
        type: Object
    },
    begin_date: {
        type: Date
    },
    begin_location: {
        type: String
    },
    begin_map_location: {
        type: Object
    },
    end_date: {
        type: Date
    },
    end_location: {
        type: String
    },
    end_map_location: {
        type: Object
    },
    travellers: {
        type: String
    },
    album_url: {
        type: String
    },
    cover_photo_url: {
        type: String,
        default: null
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

// user model
var Trip = mongoose.model('trip', tripSchema);

// Export model
module.exports = Trip;
