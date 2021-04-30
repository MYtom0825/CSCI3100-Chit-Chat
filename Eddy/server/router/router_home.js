const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());

router.get("/", (req, res) => {
  //accepting all get request
  res.send("running la");
});

module.exports = router;
