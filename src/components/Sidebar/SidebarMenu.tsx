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

interface ISubMenu {
  link?: string;
  text: string;
  children?: ISubMenu[];
}

const forecast: ISubMenu[] = [
  { link: "/countries", text: "СТРАНЫ" },
  { link: "/leagues", text: "ЛИГИ" },
  { link: "/teams", text: "КОМАНДЫ" },
  { link: "/matches", text: "МАТЧИ" },
  { link: "/events", text: "СОБЫТИЯ" },
];

const texts: ISubMenu[] = [
  { link: "/faq", text: "Вопросы/Ответы" },
  { link: "/privacy-policy", text: "Политика конфиденциальности" },
  { link: "/term-of-use", text: "Условия пользования" },
];

const seo: ISubMenu[] = [
  { link: "/seo", text: "Общее" },
  {
    text: "Дополнительное",
    children: [
      { link: "/seo/country", text: "Страны" },
      { link: "/seo/leagues", text: "Лиги" },
    ],
  },
  { link: "/seo/static", text: "Статические страницы" },

  // { link: "/seo/match", text: "Страница матча" },
  // { link: "/seo/faq", text: "Вопросы/Ответы" },
  // { link: "/seo/archive", text: "Архив" },
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
  {
    icon: UsergroupAddOutlined,
    name: <Link to={"/rates"}>ТАРИФЫ</Link>,
  },
  {
    icon: UsergroupAddOutlined,
    name: <Link to={"/refs"}>РЕФЕРАЛКИ</Link>,
  },
];
