const express = require('express');
const session = require('session');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = 3000;

//import files
const home = require('./router/router_home.js');
const reg = require('./router/router_reg.js');
const create = require('./router/router_create.js');
const login = require('./router/router_login.js');
const main = require('./router/router_main.js');
const mission = require('./router/router_mission.js');

app.use(session({secret: 'secret', resave:false, saveUninitialized:true}));
app.use(home);
app.use(reg);
app.use(create);
app.use(login);
app.use(main);
app.use(mission);

//mongodb
mongoose.connect("mongodb+srv://chit_chat:1230123@cluster0.4syir.mongodb.net/chit_chat?retryWrites=true&w=majority",{useNewUrlParser: true});
var db = mongoose.connection;
autoIncrement.initialize(db);
db.on('error',console.error.log(console,'MongoDB connection failed'));
db.once('succeed',()=>{console.log('Successful connection')});

//socket.io
io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
      if (error) return callback(error);
  
      socket.emit("message", { user: "admin", text: `${user.name}, Welcome to the room ${user.room}` });
      socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name}, has joined!` });
  
      socket.join(user.room);
  
      io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
    });
  
    socket.on("share", (message, callback) => {
      const user = getUser(socket.id);
      socket.broadcast.to(user.room).emit("message", { user: "admin", text: `Your partner decided to share IG: ${message} ` });
    });
  
    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit("message", { user: user.name, text: message });
      callback();
    });
  
    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit("message", { user: "admin", text: `${user.name} has left.` });
        io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
      }
    });
});

server.listen(port, () => {
    console.log(`hello world ${port}`);
})
