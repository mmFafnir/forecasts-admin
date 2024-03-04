import { FC, useEffect, useState } from "react";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import CustomAutoComplete, {
  ISelectDataAutoComplete,
} from "../../UI/Search/CustomAutoComplete";
import { fetchLeagues } from "../../../store/Slices/leaguesSlice/asyncActions";
import { IDataLeaguesFetch } from "../../../store/Slices/leaguesSlice/interface";
import { setLeague, setTir } from "../../../store/Slices/filterSlice";
import TirLeagues from "./TirLeagues";

const Leagues: FC = () => {
  const dispatch = useTypeDispatch();

  const [isTir, setIsTir] = useState<boolean>(false);

  const [data, setData] = useState<ISelectDataAutoComplete[]>([]);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);

  const addLimit = () => setLimit((prev) => prev + 20);

  const onChange = (value: string, key?: number | string) => {
    console.log(value);
    setSearch(value);
    dispatch(setLeague(key ? String(key) : ""));
  };

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchLeagues({
        limit: limit,
        page: 1,
        search: search,
        favorite: false,
      })
    )
      .then((res) => {
        const payload = res.payload as IDataLeaguesFetch;
        const data: ISelectDataAutoComplete[] = [];
        payload.data.forEach((item) => {
          data.push({
            key: String(item.id),
            value: `${item.league_name}`,
          });
        });
        setEmpty(payload.total === data.length);
        setData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, limit]);

  useEffect(() => {
    dispatch(setLeague(""));
    dispatch(setTir(""));
  }, [isTir]);
  return (
    <div style={{ minWidth: 200 }}>
      <p className="mr-2 font-semibold absolute -top-4">
        Посик по {isTir ? "Тирам" : "Лигам"}:{" "}
        <button
          style={{ color: "#1677ff" }}
          onClick={() => setIsTir((prev) => !prev)}
        >
          {isTir ? "Лиги" : "Тир"}{" "}
        </button>
      </p>
      {isTir ? (
        <TirLeagues />
      ) : (
        <CustomAutoComplete
          loading={loading}
          setLimit={addLimit}
          data={data}
          setSearch={onChange}
          empty={empty}
        />
      )}
    </div>
  );
};

export default Leagues;
