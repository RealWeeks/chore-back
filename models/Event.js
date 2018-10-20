const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventSchema = new Schema({
  person: {
    type: String,
  },
  name: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  task: {
    type: String,
  },
  allDay: {
    type: Boolean,
    default: false,
  },
  event_type: {
    type: [{
      type: String,
      enum: ['away', 'task']
    }],
    default: ['task']
  }
});

module.exports = mongoose.model('Events', EventSchema);
