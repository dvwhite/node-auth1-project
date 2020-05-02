const express = require("express");
const router = express.Router();

const { find } = require("./user-model");

router.get("/users", async (req, res) => {
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

function errDetail(res, err) {
  console.log(err);
  return res.status(500).json({
    message: "There was a problem completing the required operation",
    validation: [],
    data: {},
  });
}

module.exports = router;
