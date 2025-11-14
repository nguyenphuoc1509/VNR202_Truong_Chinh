import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ĐỔI DÒNG NÀY
// import E_learning_trường_chinh_react_tailwind_tts_framer_motion from "./e_learning_trường_chinh_react_tailwind_tts_framer_motion";
import TruongChinhApp from "./TruongChinhApp";

import TeamMembers from "./TeamMembers";
import Quiz from "./Quiz";
import Chatbot from "./Chatbot"; // 1. Import Chatbot

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          // ĐỔI Ở ĐÂY
          // element={<E_learning_trường_chinh_react_tailwind_tts_framer_motion />}
          element={<TruongChinhApp />}
        />
        <Route path="/team" element={<TeamMembers />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>

      {/* 2. Đặt Chatbot ở đây - ngoài Routes */}
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;
