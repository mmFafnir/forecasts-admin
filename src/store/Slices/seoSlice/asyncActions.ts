import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../core/axios";

interface IFetchParams {
  country: boolean;
  sportId: number;
}
export const fetchAllSeo = createAsyncThunk(
  "seo/fetchAllSeo",
  async (params: IFetchParams) => {
    const { country, sportId } = params;
    const { data } = await axios.get(
      `/get_all_ceo?country=${country}&sport_id=${sportId}`
    );
    console.log(data);
    return { sport: sportId, data: data.data };
  }
);

// create
export const createSeo = createAsyncThunk(
  "seo/createSeo",
  async (params: { sportId: number; formData: FormData }) => {
    const { sportId, formData } = params;

    const { data } = await axios.post("/create_ceo", formData);
    console.log(data);
    return { sportId, data: data.data };
  }
);

// update
export const updateStaticSeo = async (params: FormData) => {
  const { data } = await axios.post(`/update_page_static_seo`, params);
  console.log(data);
};

export const updateElementSeo = async (params: FormData, id: number) => {
  const { data } = await axios.post(`/update_ceo?ceo_id=${id}`, params);
  console.log(data);
};
