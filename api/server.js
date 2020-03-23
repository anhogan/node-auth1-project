const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const UserRouter = require('../users/user-router');
const AuthRouter = require('../auth/auth-router');
const restricted = require('../auth/restricted-middleware');
const db = require('../data/dbConfig');

const server = express();

const sessionConfig = {
  name: 'user_login',
  secret: process.env.COOKIE_SECRET || "3..2..1...let's go!",
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour session
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    tablename: 'session',
    sidfieldname: 'sid',
    knex: db,
    createtable: true,
    clearInterval: 1000 * 60 * 60 // Every hour remove expired session
  })
};

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/users', restricted, UserRouter);
server.use('/api/auth', AuthRouter);

module.exports = server;