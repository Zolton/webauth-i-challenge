const db = require("../db-Config");
const bcrypt = require("bcryptjs");

module.exports = { getAllUsers, addNewUser, addHash, validator };

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

function validator(req, res, next) {
  const { username, password } = req.headers;
  if (username && password) {
    getUser({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compare(password, user.password)) {
          next();
        } else {
          res.status(401).json({ Error: "invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ Error: "Please enter a username and password" });
  }
}

function getUser(user) {
  return db("users").where(user);
}
