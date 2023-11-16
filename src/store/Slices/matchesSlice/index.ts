import { createSlice } from "@reduxjs/toolkit";
import { TypeMatch } from "./interface";
import { EnumStatus } from "../../../types/Status";
import { fetchMatches } from "./asyncAction";

interface IState {
  matches: TypeMatch[];
  status: EnumStatus;
  total: number;
  page: number;
}

const initialState: IState = {
  matches: [],
  status: EnumStatus.LOADING,
  total: 1,
  page: 1,
};

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchMatches.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchMatches.fulfilled, (state, action) => {
      console.log(action);
      state.matches = action.payload.data;
      state.total = action.payload.data_count;
      state.page = action.payload.current_page;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(fetchMatches.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

// export const {} = matchesSlice.actions;

export default matchesSlice.reducer;
