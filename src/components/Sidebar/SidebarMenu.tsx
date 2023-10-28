import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

const forecast = ["СТРАНЫ", "ЛИГИ", "КОМАНДЫ", "МАТЧИ"];

export const SidebarMenu = [
  {
    icon: LaptopOutlined,
    name: "ГЛАВНАЯ",
    children: forecast,
  },
  {
    icon: NotificationOutlined,
    name: "ПРОГНОЗЫ",
    children: forecast,
  },
  {
    icon: UserOutlined,
    name: "СТАВИМ",
    children: forecast,
  },
];
