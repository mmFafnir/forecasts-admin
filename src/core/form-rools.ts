import { Rule } from "antd/es/form";
import { NotifyEnum } from "../types/notifyEnum";

export const required: Rule = {
  required: true,
  message: NotifyEnum.EMPTY,
};

export const validEmail: Rule = {
  required: true,
  type: "email",
  message: "Неверное значение полей e-mail!",
};

export const validNumber: Rule = {
  required: true,
  type: "number",
  message: "В поле должно быть число!",
};
