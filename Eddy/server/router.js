const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());

router.get("/", (req, res) => {
  console.log("go now");
  setTimeout(function () {
    console.log("recieved");
    //res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send("server is up and running");
  }, 100);
});

module.exports = router;
