const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const cookieParser = require('cookie-parser');
const http=require("http").createServer(app);
const convoRoute=require('./routes/conversation');
const MsgRoute=require('./routes/messages');
const io = require("socket.io")(http,{
    cors:{
        origin:["http://localhost:3000"]
    }
})


dotenv.config({path:'./config.env'})
const PORT = process.env.PORT;

require('./DB/connect.js');

// middleware
app.use(express.json({limit:'50mb'}));
app.use(helmet());
app.use(morgan("common"));
app.use(cookieParser());

// endpoints
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts",postRoute);
app.use("/api/conversation",convoRoute);
app.use("/api/messages",MsgRoute);

http.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`)
})

let users=[];

const addUser = (userId,socketId) =>{
    if(!users.some((user)=>user.userId==userId))
        users.push({userId,socketId})
}

const getUser = (userId) => {
    return users.find(user=>user.userId===userId);
}

const removeUser = (socketId) => {
    users=users.filter(user=>user.socketId!=socketId);
}

io.on("connection",(socket) => {

    // when a new user connects, add it to the current uses list
    socket.on("addUser",userId=>{
        addUser(userId,socket.id);
        console.log(users);
        io.emit("onlineUsers",users);
    })

    // sending messages and recieving messages
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage",{
            senderId,
            text
        })
    })

    // when the current user disconnects
    socket.on("disconnect",()=>{
        removeUser(socket.id);
        io.emit("onlineUsers",users);
    })
})