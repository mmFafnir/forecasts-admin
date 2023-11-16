import { TypeLeague } from "../leaguesSlice/interface";
import { ITeam } from "../teamsSlice/interface";

export type TypeMatch = {
  away_id: number;
  away_team: ITeam;
  chat_gpt_text: string | null;
  chat_gpt_text_status: number;
  created_at: Date;
  event_data_json: string;
  favorite_game: string | number;
  foreign_away_id: number;
  foreign_home_id: number;
  foreign_league_id: number;
  game_analize: null | string;
  game_cf: null | string;
  game_id: number;
  get_event_data_status: string;
  home_id: number;
  home_team: ITeam;
  id: number;
  league_id: number;
  leagues: TypeLeague;
  real_date: string;
  real_time: string;
  real_time_carbon: string;
  score: null | string;
  time: number | string;
  time_status: number;
  updated_at: Date;
};

export interface IDataMatchesFetch {
  current_page: number;
  data: TypeMatch[];
  last_page: number;
  data_count: number;
}
