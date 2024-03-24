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
  const { limit, search, favorite, tir, country } = useTypeSelector(
    (state) => state.filters
  );
  const dispatch = useTypeDispatch();

  const [page, setPage] = useState<number>(1);

  const onGetAllLeagues = (
    params: Pick<
      TFilter,
      "page" | "limit" | "search" | "favorite" | "tir" | "country"
    >
  ) => {
    dispatch(fetchLeagues(params));
  };

  useEffect(() => {
    setPage(1);
    onGetAllLeagues({
      page: 1,
      limit,
      search,
      favorite,
      tir,
      country,
    });
  }, [limit, search, favorite, tir, country]);

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
        <Table data={leagues} columns={columns} />
      </Spin>
      <Pagination
        callback={(page) => {
          setPage(page);
          onGetAllLeagues({
            page,
            limit,
            search,
            favorite,
            tir,
            country,
          });
        }}
        defaultPage={page}
        total={total}
      />
    </div>
  );
};

export default TableLeagues;
