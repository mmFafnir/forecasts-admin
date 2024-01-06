import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { TypeLanguages } from "./interface";
import { fetchLanguages } from "./actions";

interface IState {
  languages: TypeLanguages[];
  status: EnumStatus;
}

const initialState: IState = {
  languages: [],
  status: EnumStatus.LOADING,
};

const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // fetch
    builder.addCase(fetchLanguages.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchLanguages.fulfilled, (state, actions) => {
      state.status = EnumStatus.SUCCESS;
      state.languages = actions.payload;
    });
    builder.addCase(fetchLanguages.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

// export const {} = languagesSlice.actions;
export default languagesSlice.reducer;
