const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
var jsonParser = bodyParser.json();
const check = require("../controllers/check");
var problems = require("../models/problems");

//Create room landing page

const randomProblems = async (problem) => {
  try {
    let count = await problems.count();
    let t = count;
    let arr = [];
    let res = [];
    arr.push(Math.floor(Math.random() * count));
    while (arr.length < 2 && t > 0) {
      var index = Math.floor(Math.random() * count);
      var found = arr.find(function (element) {
        return element === index;
      });
      if (found === undefined) {
        arr.push(index);
        t--;
      }
    }

    for (var i in arr) {
      res.push(problem[arr[i]]);
    }
    return res;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

router.get("/", jsonParser, check, async (req, res) => {
  try {
    const problem = await problems.find();
    const random = await randomProblems(problem);
    return res.render("code_room.ejs", {
      login: false,
      signup: false,
      logout: true,
      user: req.user[0].name,
      problems: random,
    });
  } catch {
    return res.status(400).send("error");
  }
});

router.get("/:id", jsonParser, check, async (req, res) => {
  //home page with username
  var Pname = req.params.id.split("+")[0];
  var room = req.params.id.substring(req.params.id.indexOf("+") + 1);
  const problem = await problems.find({ name: Pname });
  if (req.user == null) return res.redirect("/users/home");
  else
    return res.render("code.ejs", {
      login: false,
      signup: false,
      logout: true,
      user: "",
      uid: req.user[0].name,
      problem: problem[0],
      room: true,
    });
});

module.exports = router;
