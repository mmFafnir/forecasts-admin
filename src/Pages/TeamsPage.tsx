import { FC } from "react";
import FilterHeader from "../components/Filters/FilterHeader";
import TableTeams from "../components/Tables/TableTeams";
import { EnumModalFilters } from "../types/Enums";

const filterBtnItems = [
  {
    name: "Страна",
    value: EnumModalFilters.COUNTRIES,
  },
  {
    name: "Лига",
    value: EnumModalFilters.LEAGUES,
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
