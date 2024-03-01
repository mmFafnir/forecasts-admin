import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDataTypeCountryFetch } from "./interface";
import { TFilter } from "../../../types/TypeFilter";
import axios from "../../../core/axios";

export const fetchCountries = createAsyncThunk<
  IDataTypeCountryFetch,
  Pick<TFilter, "limit" | "page" | "search">
>("countries/fetchLeague", async (params) => {
  const { limit = 10, page = 1, search = "" } = params;
  let url = "/get_country";
  url = url + `?limit=${limit}&page=${page}&search=${search}`;
  const { data } = await axios.get(url);
  return data;
});

export const createCountry = createAsyncThunk(
  "countries/createCountries",
  async (country: FormData) => {
    const { data } = await axios.post("/create_new_country", country);
    console.log(data);
    return data;
  }
);
