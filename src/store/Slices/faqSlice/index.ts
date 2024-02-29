import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { IFaq } from "./interface";
import { fetchAllFaq, postFaq } from "./ayncActions";

interface IState {
  status: EnumStatus;
  faqs: IFaq[];
}

const initialState: IState = {
  status: EnumStatus.LOADING,
  faqs: [],
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchAllFaq.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchAllFaq.fulfilled, (state, actions) => {
      state.status = EnumStatus.SUCCESS;
      state.faqs = actions.payload;
    });
    builder.addCase(fetchAllFaq.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    //Post
    builder.addCase(postFaq.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(postFaq.fulfilled, (state, actions) => {
      state.status = EnumStatus.SUCCESS;
      state.faqs = [actions.payload, ...state.faqs];
    });
    builder.addCase(postFaq.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

// export const {} = faqSlice.actions
export default faqSlice.reducer;
