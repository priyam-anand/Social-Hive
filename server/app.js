const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config({path:'./config.env'})
const PORT = process.env.PORT;

require('./DB/connect.js');

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


// endpoints
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts",postRoute);

app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`)
})
