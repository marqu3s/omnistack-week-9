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
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const helmet = require('helmet');

const routes = require('./routes');

const app = express();
const serverHttp = http.Server(app);
const io = socketio(serverHttp);

const connectedUsers = {};

// Database Connection
mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// Socket.io events
io.on('connection', socket => {
    console.log('Usuário conectado', socket.id);
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

// Middlewares
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/spot-images', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

// Start APP
serverHttp.listen(3333);
