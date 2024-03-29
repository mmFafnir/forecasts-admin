import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { TypeCountry } from "./interface";
import { createCountry, fetchCountries } from "./asyncActions";

interface IState {
  countries: TypeCountry[];
  status: EnumStatus;
  total: number;
  page: number;
}

const initialState: IState = {
  countries: [],
  status: EnumStatus.LOADING,
  total: 1,
  page: 1,
};

const countriesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload.data;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(fetchCountries.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // create
    builder.addCase(createCountry.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(createCountry.fulfilled, (state, action) => {
      state.countries = [action.payload.data, ...state.countries];
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(createCountry.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

export default countriesSlice.reducer;
