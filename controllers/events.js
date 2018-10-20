
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
  if (req.body.event_type !== 'away') {
    Event.findOne({person : req.body.person, date_range: req.body.start}, function(err, data){
      if(err){res.send(err)}

      if(!data) {
        let new_event = new Event(req.body)
        new_event.save(function(err, event) {
          if (err){
            res.send(err)
          }
          res.json(event)
        })
      }else{
        res.send({'error': 'Not created. Person is away'});
      }
    })

  }else{
    let new_event = new Event(req.body);
    new_event.save(function(err, event) {
      if (err){
        res.send(err)
      }
      res.json(event)
    });
  }

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
