const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
var jsonParser = bodyParser.json();
const fs = require("fs");

router.get("/", jsonParser, async (req, res) => {
  res.redirect("/home");
});

router.post("/", jsonParser, async (req, res) => {
  const ans = fs.readFileSync("./run/answer.txt", "utf8");
  return res.json(false);
});

module.exports = router;
