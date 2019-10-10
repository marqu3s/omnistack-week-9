// Load .env config file
const path = require('path');
const config = require('dotenv').config({
    path: path.join(path.resolve(__dirname, 'config'), '.env'),
});
if (config.error) {
    throw config.error;
}

// Load modules
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const helmet = require('helmet');
const app = express();

// Database Connection
mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(helmet());
app.use(express.json());
app.use(routes);
app.listen(3333);
