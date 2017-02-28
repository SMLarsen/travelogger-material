var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var Photo = new Schema({
    user_id: ObjectId,
    trip_id: ObjectId,
    day_id: ObjectId,
    caption: String,
    url: String
});

// user model
var Photo = mongoose.model('photo', photoSchema);

// Export model
module.exports = Photo;
