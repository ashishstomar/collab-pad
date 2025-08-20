import { API_BASE } from "../constants";

export const createNote = async (title) => {
  const response = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title || "Untitled Note",
      content: "",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return response.json();
};

export const getNote = async (noteId) => {
  const response = await fetch(`${API_BASE}/notes/${noteId}`);
  if (!response.ok) {
    throw new Error("Note not found");
  }
  return response.json();
};

export const updateNoteInDB = async (noteId, title, content) => {
  const response = await fetch(`${API_BASE}/notes/${noteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    throw new Error("Failed to save note");
  }
  return response.json();
};
