const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, default: "Untitled Note" },
  content: { type: String, default: "" },
  lastModified: { type: Date, default: Date.now },
  activeUsers: { type: Number, default: 0 },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
