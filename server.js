require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

//Setting the Api Router
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

//Setting the main router to serve client templates
const mainRouter = require('./routes/main');
app.use('/', mainRouter);

app.listen(3000, () => console.log('Server is listening on port 3000'));
