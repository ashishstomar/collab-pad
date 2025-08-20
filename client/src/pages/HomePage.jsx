import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Plus } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import * as noteService from "../services/noteService";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [noteId, setNoteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await noteService.createNote(title);
      navigate(`/notes/${data.note._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinNote = () => {
    if (!noteId.trim()) {
      setError("Please enter a note ID");
      return;
    }
    navigate(`/notes/${noteId.trim()}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white border-2 border-black shadow-[8px_8px_0_0_#000] p-8">
        <div className="text-center mb-8">
          <FileText className="h-12 w-12 text-black mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-black">Collab-Pad</h1>
          <p className="text-black mt-2">
            Create or join a note to start collaborating.
          </p>
        </div>

        {error && (
          <div className="bg-red-400 border-2 border-black text-black font-bold px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter a new note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateNote()}
          />
          <Button onClick={handleCreateNote} disabled={loading}>
            <Plus className="h-5 w-5 mr-2" />
            Create New Note
          </Button>

          <div className="text-center font-bold text-black">OR</div>

          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Enter note ID to join"
              value={noteId}
              onChange={(e) => setNoteId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoinNote()}
            />
            <Button
              onClick={handleJoinNote}
              disabled={loading || !noteId.trim()}
              color="cyan"
            >
              Join Note Room
            </Button>
          </div>
        </div>
        {loading && (
          <div className="text-center mt-4 font-bold">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
