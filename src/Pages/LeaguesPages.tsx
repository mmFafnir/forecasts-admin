import { FC } from "react";
import TableLeagues from "../components/Tables/TableLeagues";
import FilterHeader from "../components/Filters/FilterHeader";

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

const LeaguesPages: FC = () => {
  return (
    <>
      <div className="flex items-center">
        <h1>КОМАНДЫ</h1>
      </div>
      <div className="mt-6">
        <FilterHeader items={filterBtnItems} />
      </div>
      <div></div>
      <TableLeagues />
    </>
  );
};

export default LeaguesPages;
