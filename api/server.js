const express = require('express');
const helmet = require('helmet');
const session = require('express-session');

const UserRouter = require('../users/user-router');
const AuthRouter = require('../auth/auth-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(
  session({
    name: 'User_Login',
    secret: "3..2..1...let's go!",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
  })
);

server.use('/api/users', UserRouter);
server.use('/api', AuthRouter);

module.exports = server;