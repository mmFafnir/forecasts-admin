import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IDataLeaguesFetch,
  IUpdateLeagueParams,
  TypeLeague,
} from "./interface";
import { TFilter } from "../../../types/TypeFilter";
import axios from "../../../core/axios";

export const fetchLeagues = createAsyncThunk<
  IDataLeaguesFetch,
  Omit<TFilter, "league" | "country">
>("leagues/fetchLeague", async (params) => {
  const { limit = 10, page = 1, search = "" } = params;
  let url = "/get_all_league";
  url = url + `?limit=${limit}&page=${page}&search=${search}`;
  const { data } = await axios.get(url);
  console.log(data);
  return data.data;
});

export const updateLeague = createAsyncThunk<TypeLeague, IUpdateLeagueParams>(
  "teams/updateTeam",
  async (league) => {
    const { data } = await axios.post("/change_league", league);
    return data.data;
  }
);
