import { FC, ReactElement, useEffect, useState } from "react";
import { columns } from "./colums";
import Table from "..";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { fetchMatches } from "../../../store/Slices/matchesSlice/asyncAction";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { TFilter } from "../../../types/TypeFilter";
import { EnumStatus } from "../../../types/Status";
import { Spin } from "antd";
import Pagination from "../../UI/Pagination";

export interface DataType {
  key: React.Key;
  id: string;
  country: string;
  league: string;
  season: string;
  date: string;
  time: string;
  status: ReactElement<HTMLElement>;
  team_home: string;
  team_away: string;
  update: string;
  user: string;
  moderation: ReactElement<HTMLElement>;
}

const TableMatch: FC = () => {
  const { matches, status, total } = useTypeSelector((state) => state.matches);
  const { limit, search } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();
  const [page, setPage] = useState<number>(1);

  const onGetAllMatches = (params: TFilter) => {
    dispatch(fetchMatches(params));
  };

  useEffect(() => {
    onGetAllMatches({
      page,
      limit,
      search,
    });
  }, [page, limit, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  console.log(matches);
  return (
    <div>
      <Spin
        size="large"
        spinning={status == EnumStatus.LOADING}
        tip="Loading..."
      >
        <Table data={matches} columns={columns} />
      </Spin>
      <Pagination setPage={setPage} defaultPage={page} total={total} />
    </div>
  );
};

export default TableMatch;
