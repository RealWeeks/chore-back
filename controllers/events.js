
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
  if (req.body.event_type !== 'away') {
    console.log('task')
    console.log(req.body)
    // console.log(foo)
    Event.findOne({person : req.body.person, date_range: req.body.start}, function(err, data){
      if(err){
          res.send(err);
      }
      console.log('data');
      console.log(data);
      console.log('end')
      if(!data) {
        console.log('data0')
        let new_event = new Event(req.body);
        new_event.save(function(err, event) {
          if (err)
            res.send(err);
          res.json(event);
        });
        }else{
          res.send({'error': 'Not created. Person is away'});
        }

    // console.log(data[0].name);
    })
  }else{
    let new_event = new Event(req.body);
    new_event.save(function(err, event) {
      if (err)
        res.send(err);
      res.json(event);
    });
  }

  // console.log('reqbody')
  // console.log(req.body)


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
