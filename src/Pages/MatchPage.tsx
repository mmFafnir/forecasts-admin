import { FC, useEffect, useState } from "react";
import TableMatch from "../components/Tables/TableMatch";
import Switch, { TSwitchItem } from "../components/Filters/Switch";
import FilterHeader from "../components/Filters/FilterHeader";
import axios from "../core/axios";
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
    name: "Сезон",
    value: EnumModalFilters.SEASON,
  },
];

const MatchPage: FC = () => {
  const [statusMatch, setStatusMatch] = useState<string>(switchItems[0].name);
  console.log(statusMatch);
  const fetchMatches = async () => {
    try {
      const data = await axios.get("/get_all_promts");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

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
