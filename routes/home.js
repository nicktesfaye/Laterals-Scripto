const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
var jsonParser = bodyParser.json();
const check = require("../controllers/check");

router.get("/", jsonParser, check, (req, res) => {
  //home page
  if (req.user != null) return res.redirect("/users/home");
  else
    return res.render("home.ejs", {
      login: true,
      signup: true,
      logout: false,
      user: "",
      dp: "",
    });
});

module.exports = router;
