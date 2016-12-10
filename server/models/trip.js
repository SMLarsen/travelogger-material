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
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

tripSchema.pre('remove', function(next) {
    // Remove all the assignment docs that reference the removed person.
    this.model('Day').remove({ trip: this._id }, next);
});

// user model
var Trip = mongoose.model('trip', tripSchema);

// Export model
module.exports = Trip;
