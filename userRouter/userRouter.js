const express = require("express");
const router = express.Router();
const User = require("../helperFunctions/db-helperFunctions");

// Route: 8000/api/---

router.get("/", (req, res) => {
  res.status(200).json({ Hello: "From userRouter" });
});

router.get("/users", User.restricted, (req, res) => {
  User.getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ Error: "Server status: 500" });
    });
});


module.exports = router;
