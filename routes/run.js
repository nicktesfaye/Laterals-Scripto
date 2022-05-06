const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
const fs = require("fs");
var jsonParser = bodyParser.json();
var spawn = require("child_process").spawn;
const problem = require("../models/problems");

router.get("/", jsonParser, async (req, res) => {
  return res.redirect("/");
});
//Run program inside node
router.post("/:id", jsonParser, async (req, res) => {
  var path = await problem.findOne({ name: req.params.id });
  const lang = req.body.lang === "javascript" ? "js" : "py";
  var process;
  var object = "";

  var temp = path.testcases;
  var testCase = temp[0];
  var T = [];

  var t = testCase.split(" ");
  t.forEach((e) => {
    T.push(e);
  });

  if (lang === "js") {
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

  args = ["./run/test." + lang];
  T.forEach((element) => {
    args.push(element);
  });
  if (lang === "js") process = spawn("node", args);
  else {
    process = spawn("python", args);
  }

  process.stdout.on("data", function (data) {
    object += data.toString();
  });
  process.on("exit", (code, signal) => {
    return res.json({ result: object });
  });
});

router.post("/", jsonParser, async (req, res) => {
  var path = await problem.findOne({ name: req.body.file });
  const lang = path.file.slice(-2);
  var process;
  var object = "";

  var temp = path.testcases;
  var testCase = temp[0];
  var T = [];

  var t = testCase.split(" ");
  t.forEach((e) => {
    T.push(e);
  });

  args = ["./" + path.file];
  T.forEach((element) => {
    args.push(element);
  });
  if (lang === "js") process = spawn("node", args);
  else process = spawn("python", args);

  process.stdout.on("data", function (data) {
    object += data.toString();
  });
  process.on("exit", (code, signal) => {
    return res.json({ result: object });
  });
});

module.exports = router;
