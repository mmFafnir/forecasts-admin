import { Dispatch, SetStateAction } from "react";
import { notify } from "../../assets/scripts/notify";
import axios from "../../core/axios";

interface IParams {
  id: number;
  text: string;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

export const updateTranslateId = async (params: IParams) => {
  const { id, text, setLoading = () => {} } = params;
  setLoading(true);
  try {
    const { data } = await axios.post("/update_translation", {
      trans_id: id,
      translation: text,
    });
    notify({
      type: "success",
      message: "Успех",
      description: "Текст обновлен",
    });
    console.log(data);
  } catch (error) {
    notify({
      type: "error",
      message: "Ошибка",
      description: "Произошла ошибка, попробуйте позже",
    });
  }
  setLoading(false);
};
