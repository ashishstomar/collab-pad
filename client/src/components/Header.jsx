import { ArrowLeft, Users, Copy, Check } from "lucide-react";

const SaveStatus = ({ isSaving, isDirty }) => {
  if (isSaving) {
    return <div className="text-sm font-bold text-gray-500">Saving...</div>;
  }
  if (!isDirty) {
    return (
      <div className="flex items-center text-sm font-bold text-green-600">
        <Check className="h-4 w-4 mr-1" />
        All changes saved
      </div>
    );
  }
  return null;
};

const Header = ({
  onGoBack,
  title,
  handleTitleChange,
  activeUsers,
  noteId,
  isSaving,
  isDirty,
}) => {
  const copyNoteId = async () => {
    try {
      await navigator.clipboard.writeText(noteId);
    } catch (err) {
      console.error("Failed to copy note ID");
    }
  };

  return (
    <header className="bg-white border-b-2 border-black px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <button
            onClick={onGoBack}
            className="flex items-center justify-center p-2 bg-white text-black border-2 border-black shadow-[2px_2px_0_0_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="text-xl font-bold text-black bg-transparent border-none focus:ring-0 focus:outline-none w-full truncate"
            placeholder="Untitled Note"
          />
        </div>

        <div className="flex items-center space-x-4">
          <SaveStatus isSaving={isSaving} isDirty={isDirty} />

          <div className="flex items-center text-black font-bold">
            <Users className="h-5 w-5 mr-2" />
            <span>{activeUsers}</span>
          </div>
          <button
            onClick={copyNoteId}
            className="flex items-center px-3 py-2 bg-white text-black font-bold border-2 border-black shadow-[2px_2px_0_0_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <Copy className="h-4 w-4 mr-2" />
            ID: {noteId}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
