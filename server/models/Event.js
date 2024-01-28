const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EventSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  event_type: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  post_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Event', EventSchema);