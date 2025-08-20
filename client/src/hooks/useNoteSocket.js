import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "../constants";
import { updateNoteInDB } from "../services/noteService";

export const useNoteSocket = (note) => {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [activeUsers, setActiveUsers] = useState(1);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const socketRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    if (isDirty && note?._id) {
      const interval = setInterval(() => {
        setIsSaving(true);
        updateNoteInDB(note._id, title, content)
          .then(() => setIsDirty(false))
          .catch((err) => console.error("Auto-save failed:", err))
          .finally(() => setIsSaving(false));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [note?._id, title, content, isDirty]);

  useEffect(() => {
    if (!note?._id) return;

    socketRef.current = io(SOCKET_URL);
    const socket = socketRef.current;

    socket.emit("join-note", note._id);

    socket.on("content-updated", (data) => {
      setTitle(data.title);
      setContent(data.content);
    });

    socket.on("user-joined", (users) => setActiveUsers(users));
    socket.on("user-left", (users) => setActiveUsers(users));

    return () => {
      socket.emit("leave-note", note._id);
      socket.disconnect();
    };
  }, [note]);

  const updateNoteViaSocket = (updateData) => {
    if (!note?._id) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = socketRef.current.emit("content-change", {
      noteId: note._id,
      ...updateData,
    });
  };

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
    setIsDirty(true);
    updateNoteViaSocket({ title: newTitle, content });
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    setIsDirty(true);
    updateNoteViaSocket({ content: newContent, title });
  };

  return {
    title,
    content,
    activeUsers,
    isSaving,
    isDirty,
    handleTitleChange,
    handleContentChange,
  };
};
