// Make connection
//var ip = "";
var socket = io.connect("http://localhost:3000/");
//var socket = io.connect(ip);

// Query DOM
var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("chat-output"),
  feedback = document.getElementById("feedback");

const room = window.location.pathname.substring(
  window.location.pathname.indexOf("+") + 1
);
let admin = false,
  pin = true;

// Emit events
socket.emit("join", { handle: handle.value.slice(6), room: room });
//send button
btn.addEventListener("click", function () {
  if (handle.value && message.value) {
    socket.emit("chat", {
      message: message.value,
      handle: handle.value.slice(6),
      room: room,
    });
    message.value = "";
    handle.style.fontSize = "18px";
    handle.style.fontWeight = "bold";
  }
});

//to send message
message.addEventListener("keyup", function (event) {
  if (handle.value && event.key === "Enter") {
    event.preventDefault();
    if (message.value != "") {
      socket.emit("chat", {
        message: message.value,
        handle: handle.value.slice(6),
        room: room,
      });
      message.value = "";
      handle.style.fontSize = "18px";
      handle.style.fontWeight = "bold";
    }
  }
});

//typping...
message.addEventListener("keyup", function (event) {
  if (message.value)
    socket.emit("typing", { handle: handle.value.slice(6), room: room });
  else socket.emit("typing", { handle: "", room: room });
});

// Listen for events

socket.on("chat", function (data) {
  console.log("notnull");
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function (data) {
  if (data.handle)
    feedback.innerHTML =
      "<p><em>" + data.handle + " is typing a message...</em></p>";
  else feedback.innerHTML = "";
});

socket.on("join", function (data) {
  output.innerHTML +=
    "<p><strong>" + data.handle + " </strong>" + "has joined the chat" + "</p>";
});

socket.on("leave", function (data) {
  const para = document.createElement("p");
  const strong = document.createElement("strong");
  const node = document.createTextNode(data.name);
  const msg = document.createTextNode("  has left the chat");
  strong.appendChild(node);
  para.appendChild(strong);
  para.appendChild(msg);
  output.appendChild(para);
});
