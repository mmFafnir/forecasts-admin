import { FC } from "react";
import FilterHeader from "../components/Filters/FilterHeader";
import TableTeams from "../components/Tables/TableTeams";

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

const TeamsPage: FC = () => {
  return (
    <>
      <div className="flex items-center">
        <h1>КОМАНДЫ</h1>
      </div>
      <div className="mt-6">
        <FilterHeader items={filterBtnItems} />
      </div>
      <div></div>
      <TableTeams />
    </>
  );
};

export default TeamsPage;
