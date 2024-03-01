import { FC, Key, ReactElement, useEffect, useState } from "react";
import { columns } from "./colums";
import Table from "..";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { fetchMatches } from "../../../store/Slices/matchesSlice/asyncAction";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { TFilter } from "../../../types/TypeFilter";
import { EnumStatus } from "../../../types/Status";
import { Spin } from "antd";
import Pagination from "../../UI/Pagination";
import { getMatchTextGptArray } from "../../../api/ChatGPT";

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
  const {
    limit,
    search,
    date,
    chat_gpt_text_status,
    league,
    country,
    statusMatch,
    tir,
  } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();
  const [page, setPage] = useState<number>(1);

  const onGetAllMatches = (params: Required<Omit<TFilter, "favorite">>) => {
    dispatch(fetchMatches(params));
  };

  const getAllMatch = async (ids: Key[]) =>
    await getMatchTextGptArray(ids as number[]);

  useEffect(() => {
    console.log(page);
    onGetAllMatches({
      page: page - 1,
      limit,
      country,
      league,
      search,
      date: date ? date : { start: "", finish: "" },
      chat_gpt_text_status: chat_gpt_text_status ? chat_gpt_text_status : "",
      statusMatch,
      tir,
    });
  }, [page]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
      return;
    }
    onGetAllMatches({
      page: 0,
      limit,
      country,
      league,
      search,
      date: date ? date : { start: "", finish: "" },
      chat_gpt_text_status: chat_gpt_text_status ? chat_gpt_text_status : "",
      statusMatch,
      tir,
    });
  }, [
    search,
    limit,
    search,
    date,
    chat_gpt_text_status,
    league,
    country,
    statusMatch,
    tir,
  ]);

  return (
    <div>
      <Spin
        size="large"
        spinning={status == EnumStatus.LOADING}
        tip="Loading..."
      >
        <Table
          data={matches}
          columns={columns}
          callback={{ fn: getAllMatch, title: "Получит текст чат GPT" }}
        />
      </Spin>
      <Pagination setPage={setPage} defaultPage={page} total={total} />
    </div>
  );
};

export default TableMatch;
