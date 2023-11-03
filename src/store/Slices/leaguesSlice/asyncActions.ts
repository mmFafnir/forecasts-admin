import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDataLeaguesFetch } from "./interface";
import { TFilter } from "../../../types/TypeFilter";
import axios from "../../../core/axios";

export const fetchLeagues = createAsyncThunk<IDataLeaguesFetch, TFilter>(
  "leagues/fetchLeague",
  async (params) => {
    const { limit = 10, page = 1, search = "" } = params;
    let url = "/get_all_league";
    url = url + `?limit=${limit}&page=${page}&search=${search}`;
    const { data } = await axios.get(url);
    return data.data;
  }
);
