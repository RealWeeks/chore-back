module.exports = function(app) {
  const Events = require('../controllers/events');

  app.route('/events')
    .get(Events.get_events)
    .post(Events.create_event);


  app.route('/events/:event_id')
    .get(Events.read_event)
    .put(Events.update_event)
    .delete(Events.delete_event);
};
