module.exports = { sanitizeUser };

function sanitizeUser(user) {
  // Removes passwords from user objects
  delete user.password;
  return user;
};
