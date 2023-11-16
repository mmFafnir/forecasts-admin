import { createSlice } from "@reduxjs/toolkit";
import { fetchTeams } from "./asyncActions";
import { ITeam } from "./interface";
import { EnumStatus } from "../../../types/Status";

interface IState {
  teams: ITeam[];
  status: EnumStatus;
  total: number;
  page: number;
}

const initialState: IState = {
  teams: [],
  status: EnumStatus.LOADING,
  total: 1,
  page: 1,
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.teams = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.current_page;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(fetchTeams.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

// export const {} = teamsSlice.actions;

export default teamsSlice.reducer;
