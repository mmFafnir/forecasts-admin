import axios from "../../core/axios";

export const asyncTogglePindLeague = async (id: number | string) => {
  const { data } = await axios(
    `/add_or_delete_league_in_favorite/league_id=${id}`
  );
  console.log(data);
  return data;
};
