import {
  EditOutlined,
  LaptopOutlined,
  NotificationOutlined,
  TranslationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const forecast = [
  { link: "/countries", text: "СТРАНЫ" },
  { link: "/leagues", text: "ЛИГИ" },
  { link: "/teams", text: "КОМАНДЫ" },
  { link: "/matches", text: "МАТЧИ" },
  { link: "/bookmakers", text: "ТОП БУКМЕКЕРОВ" },
  { link: "/events", text: "СОБЫТИЯ" },
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
    // children: forecast,
  },
  {
    icon: EditOutlined,
    name: <Link to={"/prompts"}>ПРОМТЫ</Link>,
  },
  {
    icon: TranslationOutlined,
    name: <Link to={"/translate"}>ПЕРЕВОДЫ</Link>,
  },
];
