const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Author: {
    type: String,
    required: true,
    maxlength: 20,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  testcases: {
    type: Array,
    defaultValue: [],
  },
});

module.exports = mongoose.model("Problem", schema);
