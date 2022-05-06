const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
const fs = require("fs");
var jsonParser = bodyParser.json();
var spawn = require("child_process").spawn;
const problem = require("../models/problems");

//Click submit !!!!!!!!not Completed
router.post("/:id", jsonParser, async (req, res) => {
  if (req.body.lang === "javascript") {
    try {
      fs.writeFileSync("./run/test.js", req.body.code);
    } catch (e) {
      console.log("writing error: " + e.message);
    }
  } else {
    try {
      fs.writeFileSync("./run/test.py", req.body.code);
    } catch (e) {
      console.log("writing error: " + e.message);
    }
  }

  fs.writeFileSync("./run/answer.txt", "");

  var path = await problem.findOne({ name: req.params.id });
  var temp = path.testcases,
    object = "";
  const lang = req.body.lang === "javascript" ? "js" : "py";
  var count = temp.length;

  temp.forEach((testCase) => {
    var T = [];
    if (testCase) {
      var temp = testCase.split(" ");
      temp.forEach((e) => {
        T.push(e);
      });
    }

    args = ["./run/test." + lang];
    T.forEach((element) => {
      args.push(element);
    });
    if (lang === "js") process = spawn("node", args);
    else process = spawn("python", args);
    process.stdout.on("data", function (data) {
      fs.appendFileSync("./run/answer.txt", data.toString());
      count--;
      if (count === 0) {
        object = fs.readFileSync("./run/answer.txt", "utf8");
        return res.json(true);
      }
    });
  });
  return res.json(true);
});

module.exports = router;
