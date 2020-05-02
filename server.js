const express = require("express");
const server = express();

// Middleware
const cors = require("cors");
const helmet = require("helmet");
const session = require("session")
const authRoute = require("./../routes/authRouter");
const restricted = require("./routes/restricted");

// Session config object
const sessionConfig = {
  name: config,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 30,
    secure: process.env.SESSION_SECURE,
    httpOnly: true
  },
  resave: false,
  saveUnitialized: false,
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

// Routes
server.use("/login", restricted, authRoute);
server.use("/register", restricted, authRoute);

// Error middleware
server.use((err, req, res, next) => {
  console.log(err)
  if (err) {
    return res.status(500).json({
      message: "There was an error performing the required operation",
      validation: [],
      data: {}
    });
  }
})

module.exports = server;