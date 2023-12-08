import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IDataMatchesFetch,
  IUpdateEventMatch,
  TypeMatchEventCard,
} from "./interface";
import { TFilter } from "../../../types/TypeFilter";
import axios from "../../../core/axios";

export const fetchMatches = createAsyncThunk<
  IDataMatchesFetch,
  Required<TFilter>
>("matches/fetchMatches", async (params) => {
  const {
    limit = 10,
    page = 1,
    search = "",
    date,
    chat_gpt_text_status,
  } = params;
  const offset = Number(page) * Number(limit);
  let url = "/get_match";
  url =
    url +
    `?limit=${limit}&offset=${offset}&team_name=${search}&date_start=${date.start}&date_end=${date.finish}&chat_gpt_text_status=${chat_gpt_text_status}`;

  const { data } = await axios.get(url);
  console.log(data);
  return data;
});

export const updateEventMatch = createAsyncThunk<
  TypeMatchEventCard,
  IUpdateEventMatch
>("matches/updateEventMatch", async (params) => {
  const { data } = await axios.post("/update_card", params);
  return data;
});

export const switchFavoriteCups = createAsyncThunk(
  "matches/switchFavoriteCups",
  async (id: number) => {
    const { data } = await axios.get(
      `/add_or_delete_in_favorite_match/match_id=${id}`
    );
    return data;
  }
);
