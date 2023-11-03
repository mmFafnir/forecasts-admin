import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import LayoutMain from "./layouts/LayoutMain";
import MatchPage from "./pages/MatchPage";
import MatchElementPage from "./pages/MatchElementPage";
import AuthPage from "./pages/AuthPage";

import TeamsPage from "./pages/TeamsPage";
import SecurityProvider from "./modules/SecurityProvider";
import PromptsPage from "./pages/PromptsPage";
import LeaguesPages from "./pages/LeaguesPages";
import CountriesPage from "./pages/CountriesPage";
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
      <Route
        path="/"
        element={
          // <SecurityProvider>
          <LayoutMain />
          // </SecurityProvider>
        }
      >
        <Route path="" element={<TeamsPage />} />

        <Route path="/matches" element={<MatchPage />} />
        <Route path="/matches/:id" element={<MatchElementPage />} />

        <Route path="/teams" element={<TeamsPage />} />

        <Route path="/leagues" element={<LeaguesPages />} />

        <Route path="/countries" element={<CountriesPage />} />

        <Route path="/prompts" element={<PromptsPage />} />

        <Route
          path="*"
          element={
            <h1 className="text-3xl mt-20 font-bold">В процессе разработки)</h1>
          }
        />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
