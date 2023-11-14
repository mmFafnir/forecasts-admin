import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { TypeLeague } from "./interface";
import { fetchLeagues, updateLeague } from "./asyncActions";

interface IState {
  leagues: TypeLeague[];
  status: EnumStatus;
  total: number;
  page: number;
}

const initialState: IState = {
  leagues: [],
  status: EnumStatus.LOADING,
  total: 1,
  page: 1,
};

const leaguesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchLeagues.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchLeagues.fulfilled, (state, action) => {
      state.leagues = action.payload.data;
      state.total = action.payload.last_page;
      state.page = action.payload.current_page;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(fetchLeagues.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    //update
    builder.addCase(updateLeague.rejected, (_, action) => {
      throw {
        code: action.error.code,
        message: action.error.message,
      };
    });
  },
});

// export const {} = leaguesSlice.actions;

export default leaguesSlice.reducer;
