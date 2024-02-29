import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { IFaq } from "./interface";
import { deleteFaq, fetchAllFaq, postFaq } from "./ayncActions";

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

    //Delete
    builder.addCase(deleteFaq.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(
      deleteFaq.fulfilled,
      (state, actions: PayloadAction<number>) => {
        state.status = EnumStatus.SUCCESS;
        state.faqs = [
          ...state.faqs.filter((faq) => faq.id !== actions.payload),
        ];
      }
    );
    builder.addCase(deleteFaq.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

// export const {} = faqSlice.actions
export default faqSlice.reducer;
