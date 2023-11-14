import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { TypeCountry } from "./interface";
import { fetchCountries } from "./asyncActions";

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
      state.countries = [
        ...action.payload.data.map((country) => {
          country["id"] = country.code;
          return country;
        }),
      ];
      state.total = action.payload.last_page;
      state.page = action.payload.current_page;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(fetchCountries.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

// export const {} = countriesSlice.actions;

export default countriesSlice.reducer;
