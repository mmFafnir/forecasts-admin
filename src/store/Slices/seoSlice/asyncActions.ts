import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../core/axios";
import { IUpdateSeoFaq } from "./interface";

export const fetchAllSeo = createAsyncThunk("seo/fetchAllSeo", async () => {
  const { data } = await axios.get("/get_all_ceo");
  console.log(data);
  return data.data;
});

// create
export const createSeo = createAsyncThunk(
  "seo/createSeo",
  async (params: FormData) => {
    const { data } = await axios.post("/create_ceo", params);
    console.log(data);
    return data.data;
  }
);

// update
export const updateHomeSeo = async (params: FormData) => {
  const { data } = await axios.post("/update_home_page_ceo", params);
  console.log(data);
};

export const updateMatchSeo = async (params: FormData) => {
  const { data } = await axios.post("/update_match_page_ceo", params);
  console.log(data);
};

export const updateFaqSeo = async (params: IUpdateSeoFaq) => {
  const { data } = await axios.post("/update_global_ceo_faq", params);
  console.log(data);
};
