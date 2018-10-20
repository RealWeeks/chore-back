
const mongoose = require('mongoose')
const Event = mongoose.model('Events')

const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

exports.get_events = function(req, res) {
  Event.find({}, function(err, event) {
    if (err)
      res.send(err);
    res.json(event);
  });
};

exports.create_event = function(req, res) {
  // { person: 'Adam',
  // start: '10-01-2018',
  // end: '10-03-2018',
  // allDay: true,
  // event_type: 'away' }
  if (req.body.event_type === 'away') {
    let start = new Date(req.body.start)
    let end   = new Date(req.body.end)
    let range = moment.range(start, end)
    for (let day of range.by('day')) {
      day.format('YYYY-MM-DD');
    }
    let days = Array.from(range.by('day'));
    let daysArray = days.map(x => x.format('YYYY-MM-DD')) // [ '2018-10-03', '2018-10-04', '2018-10-05', '2018-10-06' ]
  }

  // console.log('reqbody')
  // console.log(req.body)

  let new_event = new Event(req.body);
  new_event.save(function(err, event) {
    if (err)
      res.send(err);
    res.json(event);
  });
};


exports.read_event = function(req, res) {
  Event.findById(req.params.event_id, function(err, event) {
    if (err)
      res.send(err);
    res.json(event);
  });
};


exports.update_event = function(req, res) {
  Event.findOneAndUpdate({_id: req.params.event_id}, req.body, {new: true}, function(err, event) {
    if (err)
      res.send(err);
    res.json(event);
  });
};


exports.delete_event = function(req, res) {
  Event.remove({
    _id: req.params.event_id
  }, function(err, event) {
    if (err)
      res.send(err);
    res.json({ message: 'Deleted' });
  });
};
