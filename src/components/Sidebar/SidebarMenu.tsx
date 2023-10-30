import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const forecast = [
  { link: "/country", text: "СТРАНЫ" },
  { link: "/leagues", text: "ЛИГИ" },
  { link: "/teams", text: "КОМАНДЫ" },
  { link: "/matches", text: "МАТЧИ" },
];

export const SidebarMenu = [
  {
    icon: LaptopOutlined,
    name: <Link to={"/"}>ГЛАВНАЯ</Link>,
    // children: forecast,
  },
  {
    icon: NotificationOutlined,
    name: "ПРОГНОЗЫ",
    children: forecast,
  },
  {
    icon: UserOutlined,
    name: "СТАВИМ C ИИ",
    children: forecast,
  },
];
