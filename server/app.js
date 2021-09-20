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
