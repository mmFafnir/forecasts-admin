import { FC, useEffect, useState } from "react";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { TFilter } from "../../../types/TypeFilter";
import { Spin } from "antd";
// import Pagination from "../../UI/Pagination";
import Table from "..";
import { columns } from "./colums";
import { EnumStatus } from "../../../types/Status";
import { fetchBookmakers } from "../../../store/Slices/bookmakersSlice/asyncActions";

const TableBookmakers: FC = () => {
  const { bookmakers, status } = useTypeSelector((state) => state.bookmakers);
  const { limit, search } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();

  const [page, setPage] = useState<number>(1);

  const onGetAllLeagues = (
    params: Pick<TFilter, "page" | "search" | "limit">
  ) => {
    dispatch(fetchBookmakers(params));
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
        <Table data={bookmakers} columns={columns} />
      </Spin>
      {/* <Pagination setPage={setPage} defaultPage={page} total={total} /> */}
    </div>
  );
};

export default TableBookmakers;
