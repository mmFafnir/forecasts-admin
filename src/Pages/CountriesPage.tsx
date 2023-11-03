import { FC } from "react";
import FilterHeader from "../components/Filters/FilterHeader";
import TableCountries from "../components/Tables/TableCountries";

const CountriesPage: FC = () => {
  return (
    <>
      <div className="flex items-center">
        <h1>СТРАНЫ</h1>
      </div>
      <div className="mt-6">
        <FilterHeader items={[]} />
      </div>
      <div></div>
      <TableCountries />
    </>
  );
};

export default CountriesPage;
