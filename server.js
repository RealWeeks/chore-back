const express = require('express')
const cors = require('cors')
const winston = require('winston')
const expressWinston = require('express-winston')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session');
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(session({ secret: 'secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(expressWinston.logger({
     transports: [
       new winston.transports.Console()
     ],
     format: winston.format.combine(
       winston.format.colorize(),
       winston.format.json()
     ),
     meta: true, // optional: control whether you want to log the meta data about the request (default to true)
     msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
     expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
     colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
     ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
   }));

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/Caldb');

const Event = require('./models/Event')
const User = require('./models/User')
require('./config/passport')






app.use(expressWinston.errorLogger({
      transports: [
        new winston.transports.Console()
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      )
    }));


app.listen(port);

const routes = require('./routes/index')
routes(app)


console.log('Port: ' + port);
