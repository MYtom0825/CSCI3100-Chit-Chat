const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const socketio = require("socket.io");
const http = require("http");
let Chat = require("./model/model_chat.js");
let UserAccount = require("./model/model_account.js");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//import files
const home = require("./router/router_home.js");
const reg = require("./router/router_reg.js");
const create = require("./router/router_create.js");
const login = require("./router/router_login.js");
const main = require("./router/router_main.js");
const mission = require("./router/router_mission.js");
const account = require("./router/router_account.js");

app.use(session({ secret: "secretdasfdsagdsaqewqecxzc", resave: false, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(home);
app.use(reg);
app.use(account);
app.use(create);
app.use(login);
app.use(main);
app.use(mission);

//mongodb connection
mongoose.connect("mongodb+srv://chit_chat:1230123@cluster0.4syir.mongodb.net/chit_chat?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
var db = mongoose.connection;
autoIncrement.initialize(db);
db.on("error", () => console.log("MongoDB connection failed"));
db.once("open", () => {
  console.log("Successful connection to MongoDB");
});

//belows are socket.io code for chatting
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    //user joining socket room
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    //welcome user joining the room
    socket.emit("message", { user: "admin", text: `${user.name}, Welcome to the room ${user.room}` });
    socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name}, has joined!` });

    socket.join(user.room);
    //ask user's partner to share his popup quiz answer
    socket.broadcast.to(user.room).emit("shareAgain");
    //tell partner user has joined
    io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
  });

  socket.on("share", (message, callback) => {
    //share ig to the partner when user choose sharing
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit("message", { user: "admin", text: `Your partner decided to share IG: ${message} ` });
  });

  socket.on("answer", (userResponse) => {
    //pass popupquiz answer to partner
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit("showquiz", userResponse);
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    //emit that message to other user in the room
    io.to(user.room).emit("message", { user: user.name, text: message });
    //saving the chat in database
    UserAccount.findOne({ username: user.name }, (err, account) => {
      if (err) {
        console.log(err);
      } else {
        Chat.findOneAndUpdate({ room: user.room }, { $push: { chatHistory: { speaker: account.username, text: message } } }, (error) => {
          if (error) {
            console.log("chat can't save" + error);
          }
        });
      }
    });
    callback();
  });

  //socket io disconnection
  socket.on("disconnect", () => {
    //user disconnect from the socket and left the chat room
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", { user: "admin", text: `${user.name} has left.` });
      io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
