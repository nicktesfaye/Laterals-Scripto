const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
var jsonParser = bodyParser.json();
const check = require("../controllers/check");
var problems = require("../models/problems");

//Default editor page without chat
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
    return res.render("solve.ejs", {
      login: false,
      signup: false,
      logout: true,
      user: req.user === null ? "" : req.user[0].name,
      problems: random,
    });
  } catch {
    return res.status(400).send("error");
  }
});

router.get("/:id", jsonParser, check, async (req, res) => {
  //home page with username
  const problem = await problems.find({ name: req.params.id });
  if (req.user == null) return res.redirect("/users/home");
  else
    return res.render("code.ejs", {
      login: false,
      signup: false,
      logout: true,
      user: "",
      uid: req.user[0].name,
      problem: problem[0],
      room: false,
    });
});

module.exports = router;
