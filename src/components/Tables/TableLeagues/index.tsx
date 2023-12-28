import { FC, useEffect, useState } from "react";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { Spin } from "antd";
import { EnumStatus } from "../../../types/Status";
import { fetchLeagues } from "../../../store/Slices/leaguesSlice/asyncActions";
import { TFilter } from "../../../types/TypeFilter";
import { columns } from "./columnt";
import Table from "..";
import Pagination from "../../UI/Pagination";

const TableLeagues: FC = () => {
  const { leagues, status, total } = useTypeSelector((state) => state.leagues);
  const { limit, search } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();

  const [page, setPage] = useState<number>(1);

  const onGetAllLeagues = (
    params: Pick<TFilter, "page" | "limit" | "search">
  ) => {
    dispatch(fetchLeagues(params));
  };

  useEffect(() => {
    onGetAllLeagues({
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
        <Table data={leagues} columns={columns} />
      </Spin>
      <Pagination setPage={setPage} defaultPage={page} total={total} />
    </div>
  );
};

export default TableLeagues;
