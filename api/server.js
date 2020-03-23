const express = require('express');
const helmet = require('helmet');

const UserRouter = require('../users/user-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/users', UserRouter);

server.post('/api/register', (req, res) => {

});

server.post('/api/login', (req, res) => {

});

module.exports = server;