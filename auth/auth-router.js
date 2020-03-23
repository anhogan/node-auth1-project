const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./user-model');

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

      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  Users.findBy(req.body.username).first()
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = {
          id: user.id,
          username: user.username
        };

        res.status(200).json({ message: `Successfully logged in` });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
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