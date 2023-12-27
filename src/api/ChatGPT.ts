import axios from "../core/axios";
import { AxiosError } from "axios";
import { notify } from "../assets/scripts/notify";

interface IReturnGpt {
  chat_gpt_text_status: 1;
}
export const getMatchTextGpt = async (
  id: number | string
): Promise<IReturnGpt | "error"> => {
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
    return "error";
  }
};

export const getMatchTextGptArray = async (ids: number[] | string[]) => {
  try {
    const { data } = await axios.post(
      `/send_message_in_chat_gpt_for_match_with_array`,
      {
        ids: ids,
      }
    );

    notify({
      type: "success",
      message: "Запросы отправлены, ждем)",
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

export const confirmGptMessage = async (
  id: number | string
): Promise<IReturnGpt | "error"> => {
  try {
    const { data } = await axios.get(
      `/confirm_chat_gpt_message/match_id=${id}`
    );

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const resendGptMessage = async (
  id: number | string
): Promise<IReturnGpt> => {
  const { data } = await axios.get(
    `/resend_message_to_chat_gpt/match_id=${id}`
  );
  console.log(data);
  return data;
};
