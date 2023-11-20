import { IDateFilter } from "../store/Slices/filterSlice";

export interface TFilter {
  limit: string | number;
  page: string | number;
  search: string;
  date?: IDateFilter;
}
