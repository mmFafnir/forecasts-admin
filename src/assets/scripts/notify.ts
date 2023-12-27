import { notification } from "antd";
import { ArgsProps } from "antd/es/notification";

interface IParams extends ArgsProps {
  type: "success" | "error" | "info";
}

export const notify = (params: IParams) => {
  const { type } = params;
  notification[type]({
    ...params,
  });
};
