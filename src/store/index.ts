import { configureStore } from "@reduxjs/toolkit";
import matchesSlice from "./Slices/matchesSlice";
import teamsSlice from "./Slices/teamsSlice";
import filterSlice from "./Slices/filterSlice";
import userSlices from "./Slices/userSlices";
import promptsSlice from "./Slices/promptsSlice";
import leaguesSlice from "./Slices/leaguesSlice";
import countriesSlice from "./Slices/countriesSlice";

export const store = configureStore({
  reducer: {
    filters: filterSlice,
    user: userSlices,
    matches: matchesSlice,
    teams: teamsSlice,
    leagues: leaguesSlice,
    countries: countriesSlice,
    prompts: promptsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
