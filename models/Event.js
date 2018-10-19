const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  allDay: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Events', EventSchema);
