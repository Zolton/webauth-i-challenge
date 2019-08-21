const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../helperFunctions/db-helperFunctions");

// Route: 8000/api/auth/---

router.post("/register", User.addHash, (req, res) => {
  const newUser = req.body;
  User.addNewUser(newUser)
    .then(newU => {
      res.status(200).json(newU);
    })
    .catch(error => {
      res.status(500).json({ Error: "Server status: 500" });
    });
});

router.post("/login", (req, res) => {
  // First pull username and password apart
  let { username, password } = req.body;
  // Then find the user in the db
  User.getUser({ username })
    .first()
    .then(user => {
      // check if password hashes match
      if (user && bcrypt.compareSync(password, user.password)) {
        // if passwords match, start setting session cookies

        // sets a key:value pair, username=username from req.body
        req.session.username = user.username;
        // set whatever crazy key:value pair you want
        req.session.gabba = true;
        res.status(200).json({ Welcome: "User" });
      }
      // if passwords don't match, don't bother with anything else
      // Just kick out immediately
      else {
        res.status(401).json({ Error: "Invalid credentials" });
      }
    })
    // Don't forget the catch if theres an error
    .catch(error => {
      res.status(500).json({ Error: "Please send credentials" });
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy(function(error) {
    res.status(200).json({ SeeYa: "You're logged out" });
  });
});

module.exports = router;
