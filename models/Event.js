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
  date: {
    type: Date,
  },
  task: {
    type: String,
  },
  allDay: {
    type: Boolean,
    default: false,
  }
});
// person name task date

module.exports = mongoose.model('Events', EventSchema);
