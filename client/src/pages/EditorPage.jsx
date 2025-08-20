import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNoteSocket } from "../hooks/useNoteSocket";
import * as noteService from "../services/noteService";
import Header from "../components/Header";

const EditorPage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const socketData = useNoteSocket(note);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const fetchedNote = await noteService.getNote(noteId);
        setNote(fetchedNote);
      } catch (err) {
        setError("Failed to load note. It might not exist.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [noteId]);

  const handleGoBack = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="text-center font-bold p-10">Loading Note...</div>;
  }

  if (error) {
    return (
      <div className="text-center font-bold p-10 text-red-600">
        <p>{error}</p>
        <button
          onClick={handleGoBack}
          className="mt-4 px-4 py-2 bg-white border-2 border-black"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onGoBack={handleGoBack}
        title={socketData.title}
        handleTitleChange={socketData.handleTitleChange}
        activeUsers={socketData.activeUsers}
        noteId={note._id}
        isSaving={socketData.isSaving}
        isDirty={socketData.isDirty}
      />
      <main className="flex-1 p-6">
        <textarea
          value={socketData.content}
          onChange={(e) => socketData.handleContentChange(e.target.value)}
          placeholder="Start collaborating..."
          className="w-full h-full p-4 resize-y bg-white border-2 border-black shadow-[8px_8px_0_0_#000] focus:outline-none text-black text-lg leading-relaxed font-mono"
        />
      </main>
    </div>
  );
};

export default EditorPage;
