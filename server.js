const express = require("express");
const server = express();

// Middleware
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const authRoute = require("./routes/auth/authRouter");
const userRoute = require("./routes/users/users-router");
const restricted = require("./routes/auth/restricted-middleware");

// Session config object
const sessionConfig = {
  name: "config",
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 30,
    secure: process.env.SESSION_SECURE,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

// Routes
server.use("/auth", authRoute);
server.use("/api/users", restricted, userRoute);

// Error middleware
server.use((err, req, res, next) => {
  console.log(err);
  if (err) {
    return res.status(500).json({
      message: "There was an error performing the required operation",
      validation: [],
      data: {},
    });
  }
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "API up", validation: [], data: {} });
});

module.exports = server;
