import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { TypeRisk } from "./interface";
import { fetchRisks } from "./asyncActions";

interface IState {
  risks: TypeRisk[];
  status: EnumStatus;
}

const initialState: IState = {
  risks: [],
  status: EnumStatus.LOADING,
};

const risksSlice = createSlice({
  name: "risks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRisks.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchRisks.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.risks = action.payload;
    });
    builder.addCase(fetchRisks.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

export default risksSlice.reducer;
