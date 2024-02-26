const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  day: Number,
  month: Number,
  year: Number,
  events: [{
    title: String,
    time: String
  }]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
