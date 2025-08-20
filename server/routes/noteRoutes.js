const Note = require("../models/Note.js");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.get("/notes/:id", async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/notes", async (req, res) => {
  try {
    const noteId = uuidv4().slice(0, 8);
    const note = new Note({
      _id: noteId,
      title: req.body.title || "Untitled Note",
      content: req.body.content || "",
      lastModified: new Date(),
    });
    await note.save();
    res.json({ id: noteId, note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title || "Untitled Note",
        content: req.body.content || "",
        lastModified: new Date(),
      },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ id: note._id, note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
