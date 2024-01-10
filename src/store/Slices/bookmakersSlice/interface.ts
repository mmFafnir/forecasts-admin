import { TypeCountry } from "../countriesSlice/interface";
import { TypeSport } from "../sportSlice/interface";

export type TypeBookmaker = {
  code: string;
  created_at: Date;
  id: number;
  logo?: string;
  name: string;
  price: string;
  updated_at: Date;
  url: string;
  best_status: "0" | "1";
  sport: TypeSport[];
  country: TypeCountry[];
};

export interface IDataCreateBookmaker {
  name: string;
  price: number;
  logo?: string;
  code: string;
  url: string;
}

export interface IDataUpdateBookmaker {
  bookmaker_id: number;
  data: FormData;
}
