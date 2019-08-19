const express = require("express");
const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.status(200).json({ Hello: "From server.js" });
});

module.exports = server;
