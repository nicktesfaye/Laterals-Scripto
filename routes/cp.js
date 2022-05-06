const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
var jsonParser = bodyParser.json();
const check = require("../controllers/check");

router.get("/", jsonParser, check, (req, res) => {
  //Create problem landing page
  if (req.user == null) return res.redirect("/users/home");
  else
    return res.render("cp.ejs", {
      login: false,
      signup: false,
      logout: true,
      user: "",
    });
});

module.exports = router;
