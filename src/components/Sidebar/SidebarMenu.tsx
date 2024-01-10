import {
  EditOutlined,
  HomeOutlined,
  LaptopOutlined,
  NotificationOutlined,
  TranslationOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const forecast = [
  { link: "/countries", text: "СТРАНЫ" },
  { link: "/leagues", text: "ЛИГИ" },
  { link: "/teams", text: "КОМАНДЫ" },
  { link: "/matches", text: "МАТЧИ" },
  { link: "/events", text: "СОБЫТИЯ" },
];

export const SidebarMenu = [
  {
    icon: HomeOutlined,
    name: <Link to={"/"}>ГЛАВНАЯ</Link>,
    // children: forecast,
  },
  {
    icon: LaptopOutlined,
    name: <Link to={"/bookmakers"}>БУКМЕКЕРЫ</Link>,
  },
  {
    icon: NotificationOutlined,
    name: "ПРОГНОЗЫ",
    children: forecast,
  },
  {
    icon: UserOutlined,
    name: "СТАВИМ C ИИ",
    // children: forecast,
  },
  {
    icon: EditOutlined,
    name: <Link to={"/prompts"}>ПРОМТЫ</Link>,
  },
  {
    icon: TranslationOutlined,
    name: <Link to={"/translates"}>ПЕРЕВОДЫ</Link>,
  },
  {
    icon: UsergroupAddOutlined,
    name: <Link to={"/admins"}>МОДЕРАТОРЫ</Link>,
  },
  {
    icon: UsergroupAddOutlined,
    name: <Link to={"/users"}>ПОЛЬЗОВАТЕЛИ</Link>,
  },
];
