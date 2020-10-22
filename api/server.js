const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();
app.use(cors());
// using both body-parser and express.json (for some users express.json is enough)
// for some reason I have to use both on my machine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// MongoDb connection
const db = require('../config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database is connected successfully'))
  .catch(err => console.log('Error in database connection', err));

// configuring our routes
app.use('/', router);

const PORT = 5600;
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));