const express = require('express');
const session = require('session');
const mongoose = require('mongoose');
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
mongoose.connect('mongodb://localhost/happyChat');
var db = mongoose.connection;
db.on('error',console.error.log(console,'MongoDB connection failed'));
db.once('succeed',()=>{console.log('Successful connection')});

//socket.io
io.on('connection', (socket) => {
    console.log('socket We connect');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        
        //const error = function;
        if (error) {
            return callback({error: 'error'});
        }

    })

    socket.on('sendMessage', (message, callback) => {
        io.to(user.room).emit('message', { user: user.name, text: message});
    })

    socket.on('disconnect', () => {
        console.log('socket We disconnect');
    })
})

server.listen(port, () => {
    console.log(`hello world ${port}`);
})
