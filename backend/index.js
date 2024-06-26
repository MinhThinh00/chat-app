import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import { app,server } from "./socket/socket.js";

import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import messageRoute from './routes/message.route.js'
dotenv.config();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Thay đổi thành miền của ứng dụng của bạn
    credentials: true // Cho phép gửi cookie
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect(process.env.MONGO)
.then(()=>console.log("connected successfully"))
.catch((err)=>console.log(err));

app.use("/api/auth",authRoute)
app.use('/api/user',userRoute)
app.use('/api/message',messageRoute)
server.listen(8001, () => {
    console.log('Server is running on port 8001!');
})
