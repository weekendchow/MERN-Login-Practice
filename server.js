const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const signin = require('./routes/api/signin');

const app = express();

//bodyParser middleware
app.use(bodyParser.json())

//db config
const db = require('./config/keys').mongoURI;

//connect to mongoose
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

//use routes
app.use('/api/account', signin);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
