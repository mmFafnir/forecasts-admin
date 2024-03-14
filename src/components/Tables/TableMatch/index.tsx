import { FC, Key, ReactElement, useEffect, useState } from "react";
import { columns } from "./colums";
import Table from "..";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import {
  IParamsFetchMatches,
  fetchMatches,
} from "../../../store/Slices/matchesSlice/asyncAction";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { EnumStatus } from "../../../types/Status";
import { Spin, Switch } from "antd";
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
  const [hasTextGpt, setHasTextGpt] = useState<boolean>(false);

  const onGetAllMatches = (params: IParamsFetchMatches) => {
    dispatch(fetchMatches(params));
  };

  const getAllMatch = async (ids: Key[]) =>
    await getMatchTextGptArray(ids as number[]);

  useEffect(() => {
    setPage(1);
    console.log("filter, country", country, limit);
    onGetAllMatches({
      page: 0,
      limit,
      country,
      league,
      search,
      hasTextGpt: hasTextGpt,
      date: date ? date : { start: "", finish: "" },
      chat_gpt_text_status: chat_gpt_text_status ? chat_gpt_text_status : "",
      statusMatch,
      tir: tir || "",
    });
  }, [
    search,
    limit,
    search,
    date,
    chat_gpt_text_status,
    league,
    hasTextGpt,
    country,
    statusMatch,
    tir,
  ]);

  useEffect(() => {
    console.log("country", country);
  }, [country]);

  return (
    <div>
      <Spin
        size="large"
        spinning={status == EnumStatus.LOADING}
        tip="Loading..."
      >
        <div className="ml-auto flex items-center justify-end">
          <div className="flex mr-5 items-center">
            <p className=" text-base mr-2">Есть текст чат-GPT: </p>
            <Switch
              unCheckedChildren="Нет"
              onChange={setHasTextGpt}
              checked={hasTextGpt}
              checkedChildren="Да"
            />
          </div>
          <p className=" text-base text-right mr-11">
            Общее количество: <span className="font-semibold">{total}</span>
          </p>
        </div>
        <Table
          data={matches}
          columns={columns}
          callback={{ fn: getAllMatch, title: "Получит текст чат GPT" }}
        />
      </Spin>
      <Pagination
        // setPage={setPage}
        callback={(page) => {
          setPage(page);
          onGetAllMatches({
            page: page - 1,
            limit,
            country,
            league,
            hasTextGpt,
            search,
            date: date ? date : { start: "", finish: "" },
            chat_gpt_text_status: chat_gpt_text_status
              ? chat_gpt_text_status
              : "",
            statusMatch,
            tir: tir || "",
          });
        }}
        defaultPage={page}
        total={total}
      />
    </div>
  );
};

export default TableMatch;
