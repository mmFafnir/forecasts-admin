import { IDateFilter } from "../store/Slices/filterSlice";

export type TypeChatGptTextStatus = "0" | "1" | "2" | "3" | "4" | "";

export interface TFilter {
  league: string;
  country: string;
  limit: string | number;
  page: string | number;
  search: string;
  date?: IDateFilter;
  chat_gpt_text_status?: TypeChatGptTextStatus;
}
