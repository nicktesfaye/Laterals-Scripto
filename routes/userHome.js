const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
var jsonParser = bodyParser.json();
const check = require("../controllers/check");

router.get("/", jsonParser, check, (req, res) => {
  //home page for logged in user
  if (req.user == null) return res.redirect("/home");
  else
    return res.render("userHome.ejs", {
      login: false,
      signup: false,
      logout: true,
      name: req.user[0].name,
    });
});

module.exports = router;
