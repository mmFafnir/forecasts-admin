export type ITeam = {
  created_at: string | null;
  get_photo: string;
  has_quad: number;
  id: number;
  sport_id: number;
  team_cc: string;
  team_id: number;
  team_name: string;
  updated_at: string;
};

export interface IDataTeamsFetch {
  current_page: number;
  data: ITeam[];
  last_page: number;
}

export interface IUpdateTeamParams {
  team_id: string | number;
  name: string;
}
