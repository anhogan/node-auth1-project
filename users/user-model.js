const db = require('../data/dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  add
};

function find() {
  return db();
};

function findBy() {
  return db();
};

function findById(id) {
  return db();
};

function add(user) {
  return db();
};