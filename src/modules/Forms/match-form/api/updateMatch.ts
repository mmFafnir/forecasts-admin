import axios from "../../../../core/axios";

interface IParams {
  match_id: number;
  chat_gpt_text: string;
  game_analize: string;
  show_card: "0" | "1";
}

export const updateMatch = async (params: IParams) => {
  const { data } = await axios.post("/update_match", params);
  console.log(data);
};
