import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import E_learning_trường_chinh_react_tailwind_tts_framer_motion from "./e_learning_trường_chinh_react_tailwind_tts_framer_motion";
import TeamMembers from "./TeamMembers";
import Quiz from "./Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<E_learning_trường_chinh_react_tailwind_tts_framer_motion />}
        />
        <Route path="/team" element={<TeamMembers />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
