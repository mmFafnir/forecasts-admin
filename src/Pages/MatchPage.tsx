import { FC, useState } from "react";
import TableMatch from "../components/Tables/TableMatch";
import Switch, { TSwitchItem } from "../components/Filters/Switch";
import FilterHeader from "../components/Filters/FilterHeader";
import { EnumModalFilters } from "../types/Enums";

const switchItems: [TSwitchItem, TSwitchItem] = [
  {
    name: "upcoming",
    title: "Предстоящие",
  },
  {
    name: "completed",
    title: "Завершенные",
  },
];

const filterBtnItems = [
  {
    name: "Страна",
    value: EnumModalFilters.COUNTRIES,
  },
  {
    name: "Лига",
    value: EnumModalFilters.LEAGUES,
  },
  {
    name: "Дата начала",
    value: EnumModalFilters.DATE,
  },
  {
    name: "Текст чат-GPT",
    value: EnumModalFilters.STATUS_CHAT_GPT_TEXT,
  },
];

const MatchPage: FC = () => {
  const [statusMatch, setStatusMatch] = useState<string>(switchItems[0].name);
  console.log(statusMatch);

  return (
    <>
      <div className="flex items-center ">
        <h1 className="line-after">МАТЧИ</h1>
        <Switch items={switchItems} setItem={setStatusMatch} />
      </div>
      <div className="mt-6">
        <FilterHeader items={filterBtnItems} />
      </div>
      <div></div>
      <TableMatch />
    </>
  );
};

export default MatchPage;
