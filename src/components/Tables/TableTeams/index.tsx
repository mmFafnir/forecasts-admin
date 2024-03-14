import { FC, useEffect, useState } from "react";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { columns } from "./columnt";
import { Spin } from "antd";
import { EnumStatus } from "../../../types/Status";
import Table from "..";
import Pagination from "../../UI/Pagination";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { fetchTeams } from "../../../store/Slices/teamsSlice/asyncActions";
import { TFilter } from "../../../types/TypeFilter";

const TableTeams: FC = () => {
  const { teams, status, total } = useTypeSelector((state) => state.teams);
  const { limit, search } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();

  const [page, setPage] = useState<number>(1);

  const onGetAllTeams = (
    params: Pick<TFilter, "page" | "limit" | "search">
  ) => {
    dispatch(fetchTeams(params));
  };

  useEffect(() => {
    onGetAllTeams({
      page,
      limit,
      search,
    });
  }, [page, limit, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div>
      <Spin
        size="large"
        spinning={status == EnumStatus.LOADING}
        tip="Loading..."
      >
        <p className="ml-auto text-base text-right mb-2 mr-11">
          Общее количество: <span className="font-semibold">{total}</span>
        </p>
        <Table data={teams} columns={columns} />
      </Spin>
      <Pagination setPage={setPage} defaultPage={page} total={total} />
    </div>
  );
};

export default TableTeams;
