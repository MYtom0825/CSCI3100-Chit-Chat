const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());

router.get("/account", (req, res) => {
  res.send("running la");
});

module.exports = router;
