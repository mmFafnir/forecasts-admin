import { configureStore } from "@reduxjs/toolkit";
import matchesSlice from "./Slices/matchesSlice";
import teamsSlice from "./Slices/teamsSlice";
import filterSlice from "./Slices/filterSlice";
import userSlices from "./Slices/userSlices";
import promptsSlice from "./Slices/promptsSlice";
import leaguesSlice from "./Slices/leaguesSlice";
import countriesSlice from "./Slices/countriesSlice";
import eventsSlice from "./Slices/eventsSlice";
import risksSlice from "./Slices/risksSlice";
import bookmakersSlice from "./Slices/bookmakersSlice";
import pusherSlice from "./Slices/pusherSlice";
import languagesSlice from "./Slices/languagesSlice";
import sportsSlice from "./Slices/sportSlice";
import faqSlice from "./Slices/faqSlice";
import seoSlice from "./Slices/seoSlice";
import rateSlice from "./Slices/rateSlice";

export const store = configureStore({
  reducer: {
    filters: filterSlice,
    user: userSlices,
    matches: matchesSlice,
    teams: teamsSlice,
    leagues: leaguesSlice,
    countries: countriesSlice,
    prompts: promptsSlice,
    events: eventsSlice,
    risks: risksSlice,
    bookmakers: bookmakersSlice,
    pusher: pusherSlice,
    languages: languagesSlice,
    sports: sportsSlice,
    faq: faqSlice,
    seo: seoSlice,
    rate: rateSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
