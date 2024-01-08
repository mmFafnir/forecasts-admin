import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { TypeLanguages } from "./interface";
import {
  createLanguage,
  deleteLanguage,
  fetchLanguages,
} from "./asyncAactions";

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

    // create
    builder.addCase(createLanguage.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(createLanguage.fulfilled, (state, actions) => {
      state.status = EnumStatus.SUCCESS;
      state.languages = [actions.payload, ...state.languages];
    });
    builder.addCase(createLanguage.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // delete
    builder.addCase(deleteLanguage.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(deleteLanguage.fulfilled, (state, actions) => {
      state.status = EnumStatus.SUCCESS;
      state.languages = [
        ...state.languages.filter((lang) => lang.id !== actions.payload),
      ];
    });
    builder.addCase(deleteLanguage.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

// export const {} = languagesSlice.actions;
export default languagesSlice.reducer;
