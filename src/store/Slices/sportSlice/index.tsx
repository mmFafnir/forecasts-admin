import { createSlice } from "@reduxjs/toolkit";
import { TypeSport } from "./interface";
import { EnumStatus } from "../../../types/Status";
import { fetchSports } from "./asyncAction";

interface IState {
  sports: TypeSport[];
  status: EnumStatus;
}

const initialState: IState = {
  sports: [],
  status: EnumStatus.LOADING,
};

const sportsSlice = createSlice({
  name: "sports",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchSports.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchSports.fulfilled, (state, actions) => {
      state.status = EnumStatus.SUCCESS;
      state.sports = actions.payload;
    });
    builder.addCase(fetchSports.rejected, (state) => {
      state.status = EnumStatus.LOADING;
    });
  },
});

export default sportsSlice.reducer;
