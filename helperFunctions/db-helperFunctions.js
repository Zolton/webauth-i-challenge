const db = require("../db-Config");
const bcrypt = require("bcryptjs");

module.exports = { getAllUsers, addNewUser, addHash };

function getAllUsers() {
  return db("users");
}

function addNewUser(newUser) {
  return db("users").insert(newUser);
}

function addHash(req, res, next) {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password);
  user.password = hash;
  next()
}
