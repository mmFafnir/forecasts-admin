import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { TypeRef } from "./interface";
import { createRef, fetchRefs, updateRef } from "./asyncActions";

interface IState {
  status: EnumStatus;
  total: number;
  refs: TypeRef[];
}

const initialState: IState = {
  status: EnumStatus.LOADING,
  refs: [],
  total: 0,
};

const sliceRefs = createSlice({
  name: "refs",
  initialState,
  reducers: {},

  extraReducers(builder) {
    // create
    builder.addCase(fetchRefs.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchRefs.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.total = action.payload.links.length - 3;
      state.refs = action.payload.data;
    });
    builder.addCase(fetchRefs.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // create
    builder.addCase(createRef.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(createRef.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.refs = [action.payload, ...state.refs];
    });
    builder.addCase(createRef.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // update
    builder.addCase(updateRef.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(updateRef.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.refs = state.refs.map((ref) => {
        if (ref.id === action.payload.id) {
          return action.payload;
        }
        return ref;
      });
    });
    builder.addCase(updateRef.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

export default sliceRefs.reducer;
