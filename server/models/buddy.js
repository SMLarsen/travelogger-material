var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({
  trip_name: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: ObjectId,
    required: true
  },
  begin_date: {
    type: Date
  },
  begin_location: {
    type: String
  },
  end_date: {
    type: Date
  },
  end_location: {
    type: String
  },
  travellers: {
    type: String
  }
});

// user model
var Trip = mongoose.model('trip', tripSchema);

// Export model
module.exports = Trip;
