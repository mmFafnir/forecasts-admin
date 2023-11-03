import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { TypePrompt } from "./interface";
import { fetchPrompts, updatePrompts } from "./asyncActions";

interface IState {
  prompts: TypePrompt[];
  status: EnumStatus;
}

const initialState: IState = {
  prompts: [],
  status: EnumStatus.LOADING,
};

const promptsSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder.addCase(fetchPrompts.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchPrompts.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.prompts = action.payload;
    });
    builder.addCase(fetchPrompts.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    //update

    builder.addCase(updatePrompts.fulfilled, (state, action) => {
      state.prompts = [
        ...state.prompts.map((prompt) => {
          if (prompt.id == action.payload.id) return action.payload;
          return prompt;
        }),
      ];
    });
    builder.addCase(updatePrompts.rejected, (_, action) => {
      throw {
        code: action.error.code,
        message: action.error.message,
      };
    });
  },
});

export default promptsSlice.reducer;
