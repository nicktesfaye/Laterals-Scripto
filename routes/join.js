const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
var jsonParser = bodyParser.json();

//join room !!!!not under use
router.get("/", jsonParser, async (req, res) => {
  try {
    return res.render("join.ejs", {
      login: false,
      signup: false,
      logout: true,
      user: "",
    });
  } catch {
    return res.status(400).send("error");
  }
});

router.post("/", jsonParser, async (req, res) => {
  try {
    if (req.body.link) return res.redirect("/code/" + req.body.link);
    else res.redirect("/join");
  } catch {
    return res.status(400).send("error");
  }
});

module.exports = router;
