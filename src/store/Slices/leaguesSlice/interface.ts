import { TypeCountry } from "../countriesSlice/interface";

export type TypeLeague = {
  country: TypeCountry | null;
  id: number;
  league_cc: string;
  league_id: number;
  league_name: string;
  updated_at: string;
  sport_id: string;
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
}
