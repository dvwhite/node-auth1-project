const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const { findByUsername, insert } = require("./../users/user-model");

router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const hash = bcrypt.hashSync(req.body.password, process.env.HASHES);
    user.password = hash;
    const newUser = await insert(user);
    res.status(200).json({
      message: `Registered ${newUser.username} successfully`,
      validation: [],
      data: newUser,
    });
  } catch (err) {
    errDetail(res, err);
  }
});

router.post("/login", validateUsername, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findByUsername(username);
    const authenticated = bcrypt.compareSync(password, user.password);
    if (authenticated) {
      req.session.user = user;
      res.status(200).json({
        message: `Welcome, ${user.username}!`,
        validation: [],
        data: {},
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
        validation: [],
        data: {},
      });
    }
  } catch (err) {
    errDetail(res, err);
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({
          message: "There was error completing the required operation",
          validation: [],
          data: {},
        });
      } else {
        res.status(200).json({
          message: "User has been logged out",
          validation: [],
          data: {},
        });
      }
    });
  }
});

/**
 * @function validateUserId: Validate the the id exists before submitting req
 * @param {*} req: The request object sent to the API
 * @param {*} res: The response object sent from the API
 * @param {*} next: The express middleware function to move to the next middleware
 * @returns: none
 */
async function validateUserId(req, res, next) {
  try {
    const id = Number(req.params.id);
    const user = await findById(id);
    if (!user) {
      return res.status(404).json({
        message: "Not Found",
        validation: ["User id doesn't exist"],
        data: {},
      });
    }
    next();
  } catch (err) {
    errDetail(res, err);
  }
}

/**
 * @function validateUsername: Validate the the id exists before submitting req
 * @param {*} req: The request object sent to the API
 * @param {*} res: The response object sent from the API
 * @param {*} next: The express middleware function to move to the next middleware
 * @returns: none
 */
async function validateUsername(req, res, next) {
  try {
    const { username } = req.body;
    const user = await findByUsername(username);
    if (!user) {
      return res.status(404).json({
        message: "Not Found",
        validation: ["Username doesn't exist"],
        data: {},
      });
    }
    next();
  } catch (err) {
    errDetail(res, err);
  }
}

function errDetail(res, err) {
  console.log(err);
  return res.status(500).json({
    message: "There was a problem completing the required operation",
    validation: [],
    data: {},
  });
}

module.exports = router;
