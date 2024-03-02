import { Routes, Route } from "react-router-dom";
import LayoutMain from "./layouts/LayoutMain";
import MatchPage from "./Pages/MatchPage";
import MatchElementPage from "./Pages/MatchElementPage";
import AuthPage from "./Pages/AuthPage";
import TeamsPage from "./Pages/TeamsPage";
import SecurityProvider from "./modules/SecurityProvider";
import PromptsPage from "./Pages/PromptsPage";
import LeaguesPages from "./Pages/LeaguesPages";
import CountriesPage from "./Pages/Countries/CountriesPage";
import TeamsElementPage from "./Pages/TeamsElementPage";
import LeaguesElementPage from "./Pages/LeaguesElementPage";
import EventsPage from "./Pages/EventsPage";
import BookmakerPage from "./Pages/Bookmakers/BookmakersPage";
import BookmakerElementPage from "./Pages/Bookmakers/BookmakersElementPage";
import LanguagesPage from "./Pages/Languages/LanguagesPage";
import LanguagesElementPage from "./Pages/Languages/LanguagesElementPage";

import "./assets/scss/App.scss";
import AdminsPage from "./Pages/Users/AdminsPage";
import AdminsElementPage from "./Pages/Users/AdminElementPage";
import UsersPage from "./Pages/Users/UsersPage";
import FAQPage from "./Pages/Faq/FAQPage";
import SeoElementPage from "./Pages/Seo/dop/SeoElementPage";
import CountriesElementPage from "./Pages/Countries/CountriesElementPage";
import { SeoCountryPage, SeoLeaguePage, SeoPage, SeoStatic } from "./Pages/Seo";

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
        <Route path="/countries/:id" element={<CountriesElementPage />} />

        <Route path="/prompts" element={<PromptsPage />} />

        <Route path="/translates" element={<LanguagesPage />} />
        <Route path="/translates/:id" element={<LanguagesElementPage />} />

        <Route path="/admins" element={<AdminsPage />} />
        <Route path="/admins/:id" element={<AdminsElementPage />} />

        <Route path="/users" element={<UsersPage />} />

        <Route path="/faq" element={<FAQPage />} />

        <Route path="/seo" element={<SeoPage />} />

        <Route path="/seo/country" element={<SeoCountryPage />} />
        <Route path="/seo/leagues" element={<SeoLeaguePage />} />

        <Route path="/seo/:id" element={<SeoElementPage />} />

        <Route path="/seo/static" element={<SeoStatic />} />

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
