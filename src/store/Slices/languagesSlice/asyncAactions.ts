import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../core/axios";
import { IParamsLanguages, TypeLanguages } from "./interface";

// fetch
export const fetchLanguages = createAsyncThunk<TypeLanguages[]>(
  "languages/fetchLanguages",
  async () => {
    const { data } = await axios.get("/get_langs");
    return data.data;
  }
);

// Create
export const createLanguage = createAsyncThunk<TypeLanguages, IParamsLanguages>(
  "languages/createLanguage",
  async (params) => {
    const { data } = await axios.post("/create_lang", params);
    console.log(data);
    return data.create;
  }
);

// update
interface IParamsUpdate {
  data: IParamsLanguages;
  id: number;
}
export const updateLanguages = createAsyncThunk<TypeLanguages[], IParamsUpdate>(
  "languages/updateLanguages",
  async (params) => {
    console.log(params);
    const { data } = await axios.post(
      `/update_langs?lang_id=${params.id}`,
      params.data
    );
    console.log(data);
    return data.data;
  }
);

// delete
export const deleteLanguage = createAsyncThunk<number, number>(
  "languages/deleteLanguages",
  async (id) => {
    const { data } = await axios.get(`/delete_lang?lang_id=${id}`);
    console.log(data);
    return id;
  }
);
