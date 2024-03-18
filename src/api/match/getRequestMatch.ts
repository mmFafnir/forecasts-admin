import axios from "../../core/axios";
import { IFetchMatchRequest } from "../../types/match";

interface IParams {
  page: string | number;
  type: "old" | "new";
  limit: number | string;
  search: string;
}
export const getRequestMatch = async ({
  page,
  type,
  limit,
  search,
}: IParams): Promise<IFetchMatchRequest> => {
  const url = type == "new" ? "/get_match_new_requests" : "/old_match_requests";
  const { data } = await axios.get(
    `${url}?search=${search}&page=${page}&limit=${limit}`
  );
  return data.data;
};
