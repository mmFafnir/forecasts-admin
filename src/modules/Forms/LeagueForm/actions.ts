import axios from "../../../core/axios";
import { notify } from "../../../assets/scripts/notify";

interface IParamsUpdateTranslate {
  trans_id: number;
  translation: string;
}
export const updateTranslateLeague = async (params: IParamsUpdateTranslate) => {
  try {
    const { trans_id, translation } = params;
    const { data } = await axios.post("/update_translation", {
      trans_id,
      translation,
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
};
