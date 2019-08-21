const express = require("express");
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const authRouter = require("./Router/authRouter")
const userRouter = require("./userRouter/userRouter")
const knexConnection = require("./db-Config")
const server = express();

const sessionOptions = {
  name: "Monkey Punch",
  secret: process.env.COOKIE_SECRET || "ssshhh",
  cookie: {
    secure: process.env.COOKIE_SECRET || false,
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  }, 
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: knexConnection,
    createtable: true,
    clearInterval: 1000 * 60 * 60 * 24,
  })
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionOptions))
server.use("/api/auth", authRouter)
server.use("/api", userRouter)

server.get("/", (req, res) => {
  res.status(200).json({ Hello: "From server.js", session: req.session });
});

module.exports = server;