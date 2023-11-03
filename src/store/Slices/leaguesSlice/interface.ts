export type TypeLeague = {
  country: string;
  id: number;
  league_cc: string;
  league_id: number;
  league_name: string;
};

export interface IDataLeaguesFetch {
  current_page: number;
  data: TypeLeague[];
  last_page: number;
}
