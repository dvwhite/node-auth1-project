const express = require("express");
const router = express.Router();

// Middleware imports
const restricted = require("../auth/restricted-middleware");

// Db helpers
const { find } = require("./user-model");

router.get("/", restricted, async (req, res) => {
  try {
    const users = await find();
    res.status(200).json({
      message: "Success",
      validation: [],
      data: users
    })
  } catch (err) {
    errDetail(res, err);
  }
});

// Helpers
function errDetail(res, err) {
  console.log(err);
  return res.status(500).json({
    message: "There was a problem completing the required operation",
    validation: [],
    data: {},
  });
}

module.exports = router;
