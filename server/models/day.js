var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

// Subdocument Schemas
var Detail = new Schema({
    detail_type: String,
    name: String,
    icon: String,
    type: String,
    location: Object,
    location_map: Object,
    description: String,
    url: String
});

// Day document schema
var daySchema = new Schema({
    user_id: ObjectId,
    trip_id: { type: ObjectId, ref: 'Trip'},
    date: Date,
    end_location: String,
    end_map_location: Object,
    tag_line: String,
    details: [Detail],
    narrative: String,
    weather: String,
    album_url: String,
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
var Day = mongoose.model('day', daySchema);

// Export model
module.exports = Day;
