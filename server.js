const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const port = process.env.PORT || 3000

const mongoose = require('mongoose')

const Event = require('./models/Event')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Caldb');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const routes = require('./routes/events')
routes(app)


app.listen(port);


console.log('Port: ' + port);
