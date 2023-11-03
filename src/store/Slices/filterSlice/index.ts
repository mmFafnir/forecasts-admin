import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
  limit: number | string;
  search: string;
}

const initialState: IState = {
  limit: 10,
  search: "",
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
  },
});

export const { setLimit, setSearch } = filterSlice.actions;

export default filterSlice.reducer;
