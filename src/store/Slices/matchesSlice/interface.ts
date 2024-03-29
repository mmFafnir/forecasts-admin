import { TypeEvent } from "../eventsSlice/interface";
import { TypeLanguages } from "../languagesSlice/interface";
import { TypeLeague } from "../leaguesSlice/interface";
import { TypeRisk } from "../risksSlice/interface";
import { ITeam } from "../teamsSlice/interface";

type Translate = {
  lang: TypeLanguages;
  why_best: string | null;
  why: string;
};

export type TypeMatchEventCard = {
  bet: string;
  created_at: string;
  event: TypeEvent;
  id: number | string;
  odds: string | number;
  risk: TypeRisk;
  status: "0" | "1" | "2";
  updated_at: string;
  why: string;
  why_best: string | null;
  best_bet: "Yes" | "No";
  translate: Translate[];
};

export type TypeMatch = {
  away_id: number;
  away_team: ITeam;
  chat_gpt_text: string | null;
  chat_gpt_text_status: number;
  created_at: Date;
  event_data_json: string;
  cards: TypeMatchEventCard[];
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
  url: string;
  show_card: "0" | "1";
};

export interface IDataMatchesFetch {
  current_page: number;
  data: TypeMatch[];
  last_page: number;
  data_count: number;
}

export interface IUpdateEventMatch {
  card_id: number | string;
  event_id: number | string;
  risk_id: number | string;
  bet: number | string;
  odds: number;
  why: string;
  why_best: string;
}
