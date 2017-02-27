var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

// Subdocument Schemas
var Detail = new Schema({
    name: String,
    type: String,
    location: Object,
    description: String,
    url: String
});

var Photo = new Schema({
    user_id: ObjectId,
    trip_id: ObjectId,
    day_id: ObjectId,
    caption: String,
    url: String
});

// Day document schema
var daySchema = new Schema({
    user_id: ObjectId,
    trip_id: ObjectId,
    date: Date,
    end_location: String,
    end_map_location: Object,
    tag_line: String,
    detail: [Detail],
    narrative: String,
    weather: String,
    cover_photo: ObjectId,
    date_added: {
        type: Date,
        default: Date.now
    }
});

// user model
var Day = mongoose.model('day', daySchema);

// Export model
module.exports = Day;
