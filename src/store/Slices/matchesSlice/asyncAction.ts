import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IDataMatchesFetch,
  IUpdateEventMatch,
  TypeMatchEventCard,
} from "./interface";
import { TFilter } from "../../../types/TypeFilter";
import axios from "../../../core/axios";

export interface IParamsFetchMatches
  extends Required<Omit<TFilter, "favorite">> {
  hasTextGpt: boolean;
}

export const fetchMatches = createAsyncThunk<
  IDataMatchesFetch,
  IParamsFetchMatches
>("matches/fetchMatches", async (params) => {
  const {
    limit = 10,
    page = 1,
    search = "",
    date,
    chat_gpt_text_status,
    league,
    country,
    statusMatch,
    tir,
    hasTextGpt,
  } = params;
  let url = "/get_match";
  url =
    url +
    `?limit=${limit}&page=${page}&team_name=${search}&date_start=${date.start}&date_end=${date.finish}&chat_gpt_text_status=${chat_gpt_text_status}&legue_id=${league}&country_code=${country}&match_status=${statusMatch}&tir=${tir}&have_gpt_text=${hasTextGpt}`;

  const { data } = await axios.get(url);
  console.log(data);
  return { ...data.data, data_count: data.data_count };
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
