import axios from "../core/axios";
import { AxiosError } from "axios";
import { notify } from "../assets/scripts/notify";

export const getMatchTextGpt = async (id: number | string) => {
  try {
    const { data } = await axios.get(
      `/send_message_in_chat_gpt_for_match/match_id=${id}`
    );

    notify({
      type: "success",
      message: "Запрос отправлен, ждем)",
    });
    console.log(data);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    notify({
      type: "success",
      message: `Ошибка ${err.response?.status} :(`,
      description: "Попробуйте чуть позже",
    });
  }
};

export const confirmGptMessage = async (id: number | string) => {
  try {
    const { data } = await axios.get(
      `/confirm_chat_gpt_message/match_id=${id}`
    );

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const resendGptMessage = async (id: number | string) => {
  try {
    const { data } = await axios.get(
      `/resend_message_to_chat_gpt/match_id=${id}`
    );

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
