import { FC, useState } from "react";
import TableMatch from "../components/Tables/TableMatch";
import Switch, { TSwitchItem } from "../components/Filters/Switch";
import FilterBtns from "../components/Filters/FilterBtns";

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
    value: "countries",
  },
  {
    name: "Лига",
    value: "league",
  },
  {
    name: "Дата начала",
    value: "date",
  },
  {
    name: "Сезон",
    value: "season",
  },
];

const MatchPage: FC = () => {
  const [statuMatch, setStatusMatch] = useState<string>(switchItems[0].name);

  console.log(statuMatch);
  return (
    <div className="p-5">
      <div className="flex items-center ">
        <h1 className="line-after">МАТЧИ</h1>
        <Switch items={switchItems} setItem={setStatusMatch} />
      </div>
      <div className="mt-6">
        <FilterBtns items={filterBtnItems} />
      </div>
      <div></div>
      <TableMatch />
    </div>
  );
};

export default MatchPage;
