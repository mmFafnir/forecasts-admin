import { TypeCountry } from "../countriesSlice/interface";

interface ILang {
  id: number;
  url: string;
  name: string;
}
export interface ITranslateLeague {
  id: number;
  lang_id: string;
  translation: string;
  lang: ILang;
}

export type TypeLeague = {
  country: TypeCountry | null;
  id: number;
  league_cc: string;
  league_id: number;
  league_name: string;
  updated_at: string;
  sport_id: string;
  favorit: "0" | "1";
  has_toplist_admin: "0" | "1";
  translate: ITranslateLeague[];
  tir: string;
};

export interface IDataLeaguesFetch {
  current_page: number;
  data: TypeLeague[];
  last_page: number;
  total: number;
}

export interface IUpdateLeagueParams {
  league_id: string | number;
  name: string;
  tir: string;
}
