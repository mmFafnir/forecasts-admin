import { FC } from "react";
import data from "./data";
import { columns } from "./colums";
import Table from "..";

export interface DataType {
  key: React.Key;
  id: string;
  country: string;
  league: string;
  season: string;
  date: string;
  time: string;
  team_home: string;
  team_away: string;
  update: string;
  user: string;
}

const TableMatch: FC = () => {
  return <Table data={data} columns={columns} />;
};

export default TableMatch;
