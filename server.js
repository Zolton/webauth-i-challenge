const express = require("express");
const server = express();
server.use(express.json());
const userRouter = require("./userRouter/userRouter");
server.use("/api", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ Hello: "From server.js" });
});

module.exports = server;
