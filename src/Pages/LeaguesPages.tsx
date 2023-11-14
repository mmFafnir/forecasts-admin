import { FC } from "react";
import TableLeagues from "../components/Tables/TableLeagues";
import FilterHeader from "../components/Filters/FilterHeader";
import { EnumModalFilters } from "../types/Enums";

const filterBtnItems = [
  {
    name: "Страна",
    value: EnumModalFilters.COUNTRIES,
  },
];

const LeaguesPages: FC = () => {
  return (
    <>
      <div className="flex items-center">
        <h1>ЛИГИ</h1>
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
