import { FC, useEffect, useState } from "react";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import CustomAutoComplete, {
  ISelectDataAutoComplete,
} from "../../UI/Search/CustomAutoComplete";
import { fetchLeagues } from "../../../store/Slices/leaguesSlice/asyncActions";
import { IDataLeaguesFetch } from "../../../store/Slices/leaguesSlice/interface";

const Leagues: FC = () => {
  const dispatch = useTypeDispatch();
  const [data, setData] = useState<ISelectDataAutoComplete[]>([]);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);

  const addLimit = () => setLimit((prev) => prev + 20);

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchLeagues({
        limit: limit,
        page: 1,
        search: search,
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

  return (
    <>
      <p className="mr-2 font-semibold absolute -top-4">Посик по лигам:</p>
      <CustomAutoComplete
        loading={loading}
        setLimit={addLimit}
        data={data}
        setSearch={setSearch}
        empty={empty}
      />
    </>
  );
};

export default Leagues;