const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter A Username"],
    maxlength: [8, "username can have a maximum of 8 characters"],
    unique: true,
  },

  password: {
    type: String,
    minlength: [4, "minimum length of password is 4 characters"],
    required: [true, "Please Enter Password"],
  },

  email: {
    type: String,
    required: true,
    default: "abcd@example.com",
  },
});

schema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("userData", schema);
