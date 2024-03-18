import { TypeMatch } from "../store/Slices/matchesSlice/interface";
import { TypeUser } from "../store/Slices/userSlices/interface";

export interface IMatchRequest {
  id: number;
  user_id: number;
  match_id: number;
  status: "1" | "0";
  notification_status: "0" | "1";
  admin_notification_status: "0" | "1";
  created_at: string;
  updated_at: string;
  game: TypeMatch;
  user: TypeUser;
}

export interface IFetchMatchRequest {
  data: IMatchRequest[];
  total: number;
  current_page: number;
  links: [];
}
