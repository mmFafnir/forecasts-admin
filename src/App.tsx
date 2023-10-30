import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./assets/scss/App.css";
import LayoutMain from "./layouts/LayoutMain";
import MatchPage from "./Pages/MatchPage";

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
