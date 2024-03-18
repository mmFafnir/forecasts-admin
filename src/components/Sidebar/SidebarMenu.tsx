import {
  FontSizeOutlined,
  TranslationOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

interface ISubMenu {
  link?: string;
  text: string;
  children?: ISubMenu[];
}

const forecast = [
  { href: "/matches", name: <Link to={"/matches"}>МАТЧИ</Link>, menu: "1" },
  {
    href: "/countries",
    name: <Link to={"/countries"}>СТРАНЫ</Link>,
    menu: "1",
  },
  { href: "/leagues", name: <Link to={"/leagues"}>ЛИГИ</Link>, menu: "1" },
  { href: "/teams", name: <Link to={"/teams"}>КОМАНДЫ</Link>, menu: "1" },
  {
    href: "/prompts",
    name: <Link to={"/prompts"}>ПРОМТЫ</Link>,
    menu: "1",
  },
  { href: "/events", name: <Link to={"/events"}>СОБЫТИЯ</Link>, menu: "1" },
  { href: "/events", name: <Link to={"/events"}>СОБЫТИЯ</Link>, menu: "1" },
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
];

interface ISidebarMenu {
  menu: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  name: JSX.Element | string;
  href: string;
  children?: ISubMenu[];
}
export const SidebarMenu: ISidebarMenu[] = [
  {
    menu: "general",
    icon: TranslationOutlined,
    href: "/translates",
    name: <Link to={"/translates"}>ПЕРЕВОДЫ</Link>,
  },
  {
    menu: "general",
    icon: UsergroupAddOutlined,
    href: "/admins",
    name: <Link to={"/admins"}>МОДЕРАТОРЫ</Link>,
  },
  {
    menu: "general",
    icon: UsergroupAddOutlined,
    href: "/users",
    name: <Link to={"/users"}>ПОЛЬЗОВАТЕЛИ</Link>,
  },
  {
    menu: "general",
    icon: FontSizeOutlined,
    href: texts[0].link || "/",
    name: "СТАТИЧЕСКИЕ/ТЕКСТА",
    children: texts,
  },

  {
    menu: "general",
    icon: FontSizeOutlined,
    href: seo[0].link || "/",
    name: "SEO",
    children: seo,
  },
  {
    menu: "general",
    icon: UsergroupAddOutlined,
    href: "/rates",
    name: <Link to={"/rates"}>ТАРИФЫ</Link>,
  },
  {
    menu: "general",
    icon: UsergroupAddOutlined,
    href: "/refs",
    name: <Link to={"/refs"}>ПРОМО/РЕФЕРАЛ</Link>,
  },
  ...forecast,
  {
    menu: "1",
    href: "/matches/request",
    name: <Link to={"/matches/request"}>ЗАПРОСЫ</Link>,
  },
];
