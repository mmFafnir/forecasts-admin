import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { TypeRate, TypeRateDetail } from "./interface";
import {
  createDetailsRate,
  createRate,
  deleteDetailsRate,
  deleteRate,
  fetchAllRate,
  updateDetailsRate,
  updateShowRate,
} from "./asyncActions";

interface IState {
  rates: TypeRate[];
  detailRate: TypeRateDetail | null;
  deleteRate: number | null;
  showRate: number;
  status: EnumStatus;
  typeDetailRate: "create" | "update" | "";
}

const initialState: IState = {
  rates: [],
  detailRate: null,
  deleteRate: null,
  typeDetailRate: "",
  status: EnumStatus.LOADING,
  showRate: 0,
};

const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    clearDetailRate: (state) => {
      state.detailRate = null;
      state.deleteRate = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchAllRate.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchAllRate.fulfilled, (state, action) => {
      state.showRate =
        action.payload.find((rate) => rate.show_status == "1")?.id || 0;
      state.rates = action.payload;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(fetchAllRate.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    //create
    builder.addCase(createRate.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(createRate.fulfilled, (state, action) => {
      state.rates = [action.payload, ...state.rates];
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(createRate.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    //update
    builder.addCase(updateShowRate.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(updateShowRate.fulfilled, (state, action) => {
      state.showRate = action.payload.rate_id;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(updateShowRate.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // delete
    builder.addCase(deleteRate.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(deleteRate.fulfilled, (state, action) => {
      state.rates = state.rates.filter((rate) => rate.id !== action.payload);
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(deleteRate.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // create detail rate
    builder.addCase(createDetailsRate.fulfilled, (state, action) => {
      state.detailRate = action.payload;
      state.typeDetailRate = "create";
    });

    // update detail rate
    builder.addCase(updateDetailsRate.fulfilled, (state, action) => {
      state.detailRate = action.payload;
      state.typeDetailRate = "update";
    });

    // delete detail rate
    builder.addCase(deleteDetailsRate.fulfilled, (state, action) => {
      state.deleteRate = action.payload;
    });
  },
});

export const { clearDetailRate } = rateSlice.actions;
export default rateSlice.reducer;
