//setup
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const url = "mongodb://localhost/scripto";
const cookieParser = require("cookie-parser");
var socket = require("socket.io");

//connect to mongodb
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on("open", () => {
  console.log("mongoose connected...");
});

//server setup
var server = app.listen(3000, function () {
  console.log("server connected...");
});

//local setup
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//middleware
app.use(cookieParser());
app.use(express.json());
app.use("/public", express.static("public"));
app.use("/js", express.static("views/js"));

//socket connection
var io = socket(server);
let users = {},
  names = {};

io.on("connection", (socket) => {
  // console.log("socket connect succesfull: ", socket.id);

  //join room
  socket.on("join", function (data) {
    socket.join(data.room);
    io.to(data.room).emit("join", data);
    users[socket.id] = data.room;
    names[socket.id] = data.handle;
  });

  // Handle chat event
  socket.on("chat", function (data) {
    io.to(data.room).emit("chat", data);
  });

  // Handle typing event
  socket.on("typing", function (data) {
    socket.broadcast.to(data.room).emit("typing", data);
  });

  //Handle disconnect event
  socket.on("disconnect", function () {
    var room = users[socket.id];
    socket.broadcast.to(room).emit("leave", { name: names[socket.id] });
    delete users[socket.id];
    delete names[socket.id];
  });
});

//routes
const login = require("./routes/login");
const signUp = require("./routes/signUp");
const home = require("./routes/home");
const userHome = require("./routes/userHome");
const logout = require("./routes/logout");
const join = require("./routes/join");
const run = require("./routes/run");
const submit = require("./routes/submit");
const cp = require("./routes/cp");
const getFile = require("./routes/getFile");
const solve = require("./routes/solve");
const check = require("./routes/check");
const create = require("./routes/create");

//route mappings
app.use("/login", login);
app.use("/signup", signUp);
app.use("/home", home);
app.use("/users/home", userHome);
app.use("/logout", logout);
app.use("/join", join);
app.use("/run", run);
app.use("/submit", submit);
app.use("/createProblem", cp);
app.use("/getFile", getFile);
app.use("/solve", solve);
app.use("/check", check);
app.use("/createRoom", create);

app.get("*", (req, res) => {
  res.render("home.ejs", {
    login: true,
    signup: true,
    logout: false,
    user: "",
  });
});
