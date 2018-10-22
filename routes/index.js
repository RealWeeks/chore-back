module.exports = (app) => {

  // const mongoose = require('mongoose')
  // const router = require('express').Router()
  const auth = require('./auth')
  const Users = require('../controllers/users')
  const Events = require('../controllers/events');

  app.route('/events')
    .get(Events.get_events)
    .post(Events.create_event);


  app.route('/events/:event_id')
    .get(Events.read_event)
    .put(Events.update_event)
    .delete(Events.delete_event);

  app.route('/set_user')
    .post(Users.set_user, auth.optional);
    // .post(Users.set_user);

  app.route('/login')
    .post(Users.login_user, auth.optional);

  app.route('/current')
    .get(Users.current_user, auth.required);
};
