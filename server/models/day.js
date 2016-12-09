var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Subdocument Schemas
var Interesting_location = new Schema({
      name: String,
      description: String
});

var Route = new Schema({
  name: String,
  distance: String,
  duration: String,
  transport_mode: String,
  specifics: String,
  comments: String
});

var Meal = new Schema({
  type: String,
  name: String,
  location: String,
  description: String,
  reference: String
});

var Recommendation = new Schema({
  text: String
});

// Day document schema
var daySchema = new Schema({
    user_id: ObjectId,
    trip_id: ObjectId,
    date: Date,
    end_location: String,
    tag_line: String,
    interesting_locations: [Interesting_location],
    routes: [Route],
    meals: [Meal],
    lodging_name: String,
    lodging_address: String,
    lodging_type: String,
    lodging_reference: String,
    narrative: String,
    recommendations: [Recommendation],
    weather: String
});

// user model
var day = mongoose.model('day', daySchema);

// Export model
module.exports = day;
