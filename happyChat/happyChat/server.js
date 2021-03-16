const express = require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose')
const socketio = require('socket.io');
const http = require('http');

const app=express();
const server = http.createServer(app);
const io = socketio(server);

const port = 3000;

//import files
const router_home = require('./router_home.js');
const router_reg = require('./router_reg.js');
const router_create = require('./router_create.js');
const router_login = require('./router_login.js');
const router_mission = require('./router_mission.js');

app.use(session({secret: 'secret', resave:false, saveUninitialized:true}));
app.use(router_home);
app.use(router_reg);
app.use(router_create);
app.use(router_login);
app.use(router_mission);

mongoose.connect('mongodb://localhost/happyChat');
var db=mongoose.connection;

db.on('error',console.error.log(console,'MongoDB connection failed'));
db.once('succeed',()=>{console.log('Successful connection')});

var UserAccountSchema=mongoose.Schema({
    userID:{type: Number,unique: true},
    username:{type:String,unique:true,require:true},
    password:{type:String,require:true},
    email:{type:String,unique:true,require:true},
    onOffstatus:{type:String},
    userProfile:{type:mongoose.Schema.Types.ObjectId,ref:'UserProfile'},
    misson:{type:mongoose.Schema.Types.ObjectId,ref:'Mission'},
    report:{type:mongoose.Schema.Types.ObjectId,ref:'Report'},
    queue:{type:mongoose.Schema.Types.ObjectId,ref:'Queue'}
});

var UserProfileSchema=mongoose.Schema({
    account:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    picture:{type:String},
    nickName:{type:String},
    gender:{type:String,
            enum:["male","female"],
            default:"male",
    },
    university:{type:String},
    faculty:{type:String},
    major:{type:String},
    year:{type:Number},
    status:{type:String},
    interest:[{type:String}], //array of interests
    token:{type:Number},
    missionFinished:[{type:mongoose.Schema.Types.ObjectId,ref:"Mission"}],
    createdTime:{type:Date},
    contactType:{type:String},
    contact:{type:String}

});

var MissionSchema=mongoose.Schema({
    missionID:{type:Number},
    topic:{type:String},
    description:{type:String},
    token:{type:Number},
    userAccount:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'}
});

var ReportSchema=mongoose.Schema({
    userAccount:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    reporterID:{type:Number},
    reportedID:{type:Number},
    reason:{type:String},
    speakerID:{type:Number},
    text:{type:String},
    time:{type:Date}
})

var QueueSchema=mongoose.Schema({
    userAccount:{type:mongoose.Schema.Types.ObjectId,ref:'UserAccount'},
    queueNumber:{type,Number},
    requiredGender:{type:String},
    requiredUni:{type:String},
    requiredMajor:{type:String},
    requiredYear:{type:Number},
    requiredStatus:{type:String}
})

var UserAccount=mongoose.model('UserAccount',UserAccountSchema);
var UserProfile=mongoose.model('UserProfile',UserProfileSchema);
var Mission=mongoose.model('Mission',MissionSchema);
var Report=mongoose.model('Report',ReportSchema);
var Queue=mongoose.model('Queue',QueueSchema);

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
