const express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const path = require("path");
const router = express.Router();
const check = require("../controllers/check");
const multer = require("multer");
const problems = require("../models/problems");

var ext;
// Get the input file for problem Created

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "problems/");
  },
  filename: async (req, file, cb) => {
    ext = path.extname(file.originalname);
    const filepath = `/${req.body.name}${ext}`;
    cb(null, filepath);
  },
});

const upload = multer({ storage: storage });

router.get("/", jsonParser, check, (req, res) => {
  if (req.user == null) return res.redirect("/users/home");

  return res.render("cp.ejs", {
    login: false,
    signup: false,
    logout: true,
    user: req.user[0],
  });
});

router.post(
  "/",
  jsonParser,
  check,
  upload.single("inpFile"),
  async (req, res) => {
    if (req.file == null) return res.redirect("/users/home");
    try {
      const problem = await new problems({
        Author: req.user[0].name,
        name: req.body.name,
        difficulty: req.body.difficulty,
        description: req.body.description,
        testcases: req.body.testcases,
        file: `/problems/${req.body.name}${ext}`,
      });
      problem.save();
    } catch (e) {
      console.log("error:" + e.message);
    }
    res.redirect("/users/home");
  }
);

module.exports = router;
