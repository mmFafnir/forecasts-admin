import { notification } from "antd";
interface IParams {
  type: "success" | "error" | "info";
  description?: string;
  message: string;
}

export const notify = (params: IParams) => {
  const { type, message, description = "" } = params;
  notification[type]({
    message: message,
    description: description,
  });
};
