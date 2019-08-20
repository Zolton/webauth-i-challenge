const express = require("express");
const router = express.Router();
const User = require("../helperFunctions/db-helperFunctions");

router.get("/", (req, res) => {
  res.status(200).json({ Hello: "From userRouter" });
});

router.post("/users", User.validator, (req, res) => {
  User.getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ Error: "Server status: 500" });
    });
});

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

// router.post("/login", (req, res) => {
//   User.addNewUser
//     .then(logged => {
//       res.status(200).json({ Status: "Logged in" });
//     })
//     .catch(error => {
//       res.status(500).json({ Error: "Server status: 500" });
//     });
// });

module.exports = router;
