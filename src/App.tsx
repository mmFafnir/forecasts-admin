import { Routes, Route } from "react-router-dom";
import LayoutMain from "./layouts/LayoutMain";
import MatchPage from "./Pages/MatchPage";
import MatchElementPage from "./Pages/MatchElementPage";
import AuthPage from "./Pages/AuthPage";
import TeamsPage from "./Pages/TeamsPage";
import SecurityProvider from "./modules/SecurityProvider";
import PromptsPage from "./Pages/PromptsPage";
import LeaguesPages from "./Pages/LeaguesPages";
import CountriesPage from "./Pages/CountriesPage";
import TeamsElementPage from "./Pages/TeamsElementPage";
import LeaguesElementPage from "./Pages/LeaguesElementPage";
import EventsPage from "./Pages/EventsPage";
import BookmakerPage from "./Pages/BookmakersPage";
import "./assets/scss/App.scss";
import BookmakerElementPage from "./Pages/BookmakersElementPage";
import LanguagesPage from "./Pages/Languages/LanguagesPage";
import LanguagesElementPage from "./Pages/Languages/LanguagesElementPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SecurityProvider>
            <LayoutMain />
          </SecurityProvider>
        }
      >
        <Route path="" element={<MatchPage />} />

        <Route path="/matches" element={<MatchPage />} />
        <Route path="/matches/:id" element={<MatchElementPage />} />

        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:id" element={<TeamsElementPage />} />

        <Route path="/leagues" element={<LeaguesPages />} />
        <Route path="/leagues/:id" element={<LeaguesElementPage />} />

        <Route path="/bookmakers" element={<BookmakerPage />} />
        <Route path="/bookmakers/:id" element={<BookmakerElementPage />} />

        <Route path="/events" element={<EventsPage />} />

        <Route path="/countries" element={<CountriesPage />} />

        <Route path="/prompts" element={<PromptsPage />} />

        <Route path="/translates" element={<LanguagesPage />} />
        <Route path="/translates/:id" element={<LanguagesElementPage />} />

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
