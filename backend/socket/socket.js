import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    },
});

// Sử dụng Map thay vì đối tượng thuần
const userSocketMap = new Map();

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap.get(receiverId);
};

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId; // Lấy userId từ query của handshake

    if (userId) {
        userSocketMap.set(userId, socket.id);
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    } else {
        console.log('User ID not provided in handshake query.');
    }

    // Gửi danh sách các userId đang trực tuyến tới tất cả các kết nối hiện tại
    io.emit('getOnlineUsers', Array.from(userSocketMap.keys()));

    socket.on('disconnect', () => {
        if (userId) {
            userSocketMap.delete(userId);
            console.log(`User ${userId} disconnected`);
        }
        io.emit('getOnlineUsers', Array.from(userSocketMap.keys()));
    });
});

export { app, io, server };
