const router = require('express').Router();

const protected = require('../auth/auth-middleware');

const Users = require('./user-model');

router.get('/', protected, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;