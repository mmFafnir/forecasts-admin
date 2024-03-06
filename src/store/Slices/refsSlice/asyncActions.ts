import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateRef, IFetchRef, IUpdateRef, TypeRef } from "./interface";
import { TFilter } from "../../../types/TypeFilter";
import axios from "../../../core/axios";

export const fetchRefs = createAsyncThunk<
  IFetchRef,
  Pick<TFilter, "page" | "search">
>("refs/fetchRefs", async (params) => {
  const { search, page } = params;

  const { data } = await axios.get(
    `/all_ref_codes?page=${page}&search=${search}`
  );
  return data.data;
});

export const createRef = createAsyncThunk<TypeRef, ICreateRef>(
  "refs/createRef",
  async (ref) => {
    const { data } = await axios.post("/create_ref_code", ref);
    return data.data;
  }
);

export const updateRef = createAsyncThunk<TypeRef, IUpdateRef>(
  "refs/updateRef",
  async (ref) => {
    const { data } = await axios.post("/update_ref_code", ref);
    return data.data;
  }
);
