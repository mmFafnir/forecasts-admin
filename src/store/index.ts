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
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
