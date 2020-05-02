const db = require("../../data/dbConfig");

// Utils
const { sanitizeUser } = require("../../utils/utils");

module.exports = {
  find,
  findByUsername,
  insert
};

function find() {
  return db("users")
    .then(users => {
      return users.map(user => sanitizeUser(user))
    });
};

function findById(user_id) {
  return db("users")
    .where({ id: user_id })
    .first();
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
      const user = await findById(ids[0]);
      return sanitizeUser(user);
    });
};

