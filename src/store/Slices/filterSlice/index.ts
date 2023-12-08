import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TFilter, TypeChatGptTextStatus } from "../../../types/TypeFilter";

export interface IDateFilter {
  start: string;
  finish: string;
}

interface IState extends Omit<TFilter, "page"> {}

const initialState: IState = {
  limit: 10,
  search: "",
  date: {
    start: "",
    finish: "",
  },
  chat_gpt_text_status: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setDate: (state, action: PayloadAction<IDateFilter>) => {
      state.date = action.payload;
    },
    setChatGptTextStatus: (
      state,
      action: PayloadAction<TypeChatGptTextStatus>
    ) => {
      state.chat_gpt_text_status = action.payload;
    },
  },
});

export const { setLimit, setSearch, setDate, setChatGptTextStatus } =
  filterSlice.actions;

export default filterSlice.reducer;
