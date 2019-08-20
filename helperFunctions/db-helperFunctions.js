const db = require("../db-Config");
const bcrypt = require("bcryptjs");

module.exports = {
  getAllUsers,
  addNewUser,
  addHash,
  getUser,
  restricted
};

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
  next();
}

function getUser(user) {
  return db("users").where(user);
}

function restricted(req, res, next) {
  if (req.session && req.session.gabba) {
    next();
  } else {
    res.status(401).json({ Error: "invalid session settings" });
  }
}
