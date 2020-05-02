const db = require("../../data/dbConfig");

module.exports = {
  find,
  findByUsername,
  insert
};

function find() {
  return db("users")
};

function findByUsername(username) {
  return db("users")
    .where({ username })
    .first();
};

function insert(user) {
  return db("users")
    .insert(user)
    .then(async ids => {
      return await findById(ids[0])
    });
};

