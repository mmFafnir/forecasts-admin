import { createSlice } from "@reduxjs/toolkit";

interface IState {
  matches: [];
}

const initialState: IState = {
  matches: [],
};

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {},
});

// export const {} = matchesSlice.actions;

export default matchesSlice.reducer;
