import { TypeTranslate } from "../../../types/translate";
import { TypeCountry } from "../countriesSlice/interface";

export type ITeam = {
  created_at: string | null;
  has_quad: number;
  id: number;
  sport_id: number;
  team_cc: string;
  team_id: number;
  team_name: string;
  updated_at: string;
  translate: TypeTranslate[];
  photo: string | null;
  country: TypeCountry | null;
};

export interface IDataTeamsFetch {
  current_page: number;
  data: ITeam[];
  last_page: number;
  total: number;
}

export interface IUpdateTeamParams {
  team_id: string | number;
  name: string;
}
