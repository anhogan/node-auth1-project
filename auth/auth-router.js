const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/user-model');

router.post('/register', (req, res) => {
  const userData = req.body;

  const rounds = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(userData.password, rounds);

  userData.password = hash;

  Users.add(userData)
    .then(user => {
      req.session.user = {
        id: user.id,
        username: user.username
      };

      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username }).first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {
          id: user.id,
          username: user.username
        };

        res.status(200).cookie('user_id', user.id).json({ message: `Welcome ${user.username}` });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Unable to login" });
    });
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json({ message: 'Successfully logged out' });
      };
    });
  } else {
    res.status(200).json({ message: 'Must be logged in to log out' });
  };
});

module.exports = router;