import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import LayoutMain from "./layouts/LayoutMain";
import MatchPage from "./Pages/MatchPage";

import MatchElementPage from "./Pages/MatchElementPage";
import "./assets/scss/App.scss";

function App() {
  const getString = () => {
    return "sad";
  };

  useEffect(() => {
    getString();
  });

  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route path="" element={<MatchPage />} />

        <Route path="/matches" element={<MatchPage />} />
        <Route path="/:id" element={<MatchElementPage />} />

        <Route
          path="*"
          element={
            <h1 className="text-3xl mt-20 font-bold">В процессе разработки)</h1>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
