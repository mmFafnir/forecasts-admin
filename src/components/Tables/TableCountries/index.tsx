import { Spin } from "antd";
import { FC, useEffect, useState } from "react";
import Table from "..";
import Pagination from "../../UI/Pagination";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { fetchCountries } from "../../../store/Slices/countriesSlice/asyncActions";
import { TFilter } from "../../../types/TypeFilter";
import { EnumStatus } from "../../../types/Status";
import { columns } from "./colums";

const TableCountries: FC = () => {
  const { countries, status, total } = useTypeSelector(
    (state) => state.countries
  );
  const { limit, search } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();

  const [page, setPage] = useState<number>(1);

  const onGetAllLeagues = (
    params: Pick<TFilter, "page" | "search" | "limit">
  ) => {
    dispatch(fetchCountries(params));
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
  console.log(countries);
  return (
    <div>
      <Spin
        size="large"
        spinning={status == EnumStatus.LOADING}
        tip="Loading..."
      >
        <Table data={countries} columns={columns} />
      </Spin>
      <Pagination setPage={setPage} defaultPage={page} total={total} />
    </div>
  );
};

export default TableCountries;
