const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.emit("message", { user: "admin", text: `${user.name}, Welcome to the room ${user.room}` });
    socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name}, has joined!` });

    socket.join(user.room);
    socket.broadcast.to(user.room).emit("shareAgain");
    io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
  });

  socket.on("share", (message, callback) => {
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit("message", { user: "admin", text: `Your partner decided to share IG: ${message} ` });
  });

  socket.on("answer", (userResponse) => {
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit("showquiz", userResponse);
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
app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
