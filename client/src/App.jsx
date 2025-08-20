import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";

const App = () => {
  return (
    <div className="min-h-screen bg-teal-200 font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes/:noteId" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
