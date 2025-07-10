import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';
import mongoose from './config/mongo.js'; // import instance to hook into .connection

// Load environment variables first
dotenv.config();

import { VerifyToken, VerifySocketToken } from './middlewares/VerifyToken.js';
import chatRoomRoutes from './routes/ChatRoom.js';
import userRoutes from './routes/user.js';
import chatMessageRoutes from './routes/ChatMessage.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apply token verification middleware
app.use(VerifyToken);

// Routes
app.use("/api/room", chatRoomRoutes);
app.use("/api/message", chatMessageRoutes);
app.use("/api/user", userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
const server = createServer(app);

// Setup socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  },
});

io.use(VerifySocketToken);

global.onlineUsers = new Map();

const getKey = (map, val) => {
  for (let [key, value] of map.entries()) {
    if (value === val) return key;
  }
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  global.chatSocket = socket;

  socket.on("addUser", (userId) => {
    const existingSocketId = onlineUsers.get(userId);
    if (existingSocketId && existingSocketId !== socket.id) {
      const oldSocket = io.sockets.sockets.get(existingSocketId);
      if (oldSocket) {
        console.log(`Disconnecting old socket for user ${userId}: ${existingSocketId}`);
        oldSocket.disconnect();
      }
    }

    onlineUsers.set(userId, socket.id);
    io.emit("getUser", Array.from(onlineUsers));
    console.log("User added:", userId, "Socket ID:", socket.id);
  });

  socket.on("disconnect", () => {
    const userId = getKey(onlineUsers, socket.id);
    if (userId) {
      onlineUsers.delete(userId);
      console.log("User disconnected:", userId);
      socket.broadcast.emit("getUser", Array.from(onlineUsers));
    }
  });

  socket.on("sendMessage", (data) => {
    const { receiverId, message } = data;
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", message);
    }
  });
});

// ✅ Only start server once MongoDB is connected
mongoose.connection.once("open", () => {
  server.listen(PORT, () => {
    console.log(`✅ MongoDB connected`);
    console.log(`🚀 Server listening on port ${PORT}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
  });
});
