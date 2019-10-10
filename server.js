require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

//Setting up Static Files
app.use(express.static(__dirname + '/public'));

//Setting up bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//Implementing Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Configuring DB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

//Setup routes
require('./routes')(app);

app.listen(3000, () => console.log('Server is listening on port 3000'));
