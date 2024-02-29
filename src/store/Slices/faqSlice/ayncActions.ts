import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../core/axios";
import { IPostFaq } from "./interface";

// get
export const fetchAllFaq = createAsyncThunk("faq/fetchAllFaq", async () => {
  const { data } = await axios.get("/get_all_faqs");
  return data.data;
});

// create
export const postFaq = createAsyncThunk(
  "faq/postFaq",
  async (params: IPostFaq) => {
    const { data } = await axios.post("/create_faq", params);
    return data.data;
  }
);

//update
interface IUpdateParams {
  faq: IPostFaq;
  id: number;
}
export const updateFaq = createAsyncThunk(
  "faq/updateFaq",
  async (params: IUpdateParams) => {
    const { faq, id } = params;
    const { data } = await axios.post(`/update_faq?faq_id=${id}`, faq);
    console.log(data);
    return data.data;
  }
);

// delete
export const deleteFaq = createAsyncThunk(
  "faq/createAsyncThunk",
  async (id: number) => {
    await axios.get(`/delete_faq?faq_id=${id}`);
    return id;
  }
);
