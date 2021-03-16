const express = require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose')

const app=express();
mongoose.connect('mongodb://localhost/happyChat');
var db=mongoose.connection;

db.on('error',console.error.log(console,'MongoDB connection failed'));
db.once('succeed',()=>{console.log('Successful connection')});

dFsd