import {
  EditOutlined,
  FontSizeOutlined,
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

const texts = [{ link: "/faq", text: "Вопросы/Ответы" }];

const seo = [
  { link: "/seo", text: "Все" },
  { link: "/seo/home", text: "Главная" },
  { link: "/seo/match", text: "Страница матча" },
  { link: "/seo/faq", text: "Вопросы/Ответы" },
  { link: "/seo/archive", text: "Архив" },
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
  {
    icon: FontSizeOutlined,
    name: "ТЕКСТА",
    children: texts,
  },
  {
    icon: FontSizeOutlined,
    name: "SEO",
    children: seo,
  },
  // {
  //   icon: FontSizeOutlined,
  //   name: <Link to={"/users"}>ЗАПРОСЫ</Link>,
  // },
];
