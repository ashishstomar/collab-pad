require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes.js");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/api", noteRoutes);

const activeUsersInNotes = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-note", (noteId) => {
    socket.join(noteId);

    socket.noteId = noteId;

    if (!activeUsersInNotes[noteId]) {
      activeUsersInNotes[noteId] = 0;
    }
    activeUsersInNotes[noteId]++;

    io.to(noteId).emit("user-joined", activeUsersInNotes[noteId]);
  });

  socket.on("leave-note", (noteId) => {
    socket.leave(noteId);
    socket.noteId = null;

    if (activeUsersInNotes[noteId]) {
      activeUsersInNotes[noteId]--;
    }

    socket.broadcast.to(noteId).emit("user-left", activeUsersInNotes[noteId]);
  });

  socket.on("content-change", (data) => {
    const { noteId, content, title } = data;

    socket.broadcast.to(noteId).emit("content-updated", { content, title });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    const noteId = socket.noteId;

    if (noteId && activeUsersInNotes[noteId]) {
      activeUsersInNotes[noteId]--;
      io.to(noteId).emit("user-left", activeUsersInNotes[noteId]);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
