export type TypeLeague = {
  country: string;
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
}

export interface IUpdateLeagueParams {
  league_id: string | number;
  name: string;
}
