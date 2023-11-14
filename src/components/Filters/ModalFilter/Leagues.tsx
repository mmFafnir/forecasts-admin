import { FC, useEffect, useState } from "react";
import { Select } from "antd";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { fetchLeagues } from "../../../store/Slices/leaguesSlice/asyncActions";
import { IDataLeaguesFetch } from "../../../store/Slices/leaguesSlice/interface";

interface ISelectLegues {
  value: string;
  label: string;
}

const Leagues: FC = () => {
  const [data, setData] = useState<ISelectLegues[]>([]);
  const [limit, setLimit] = useState<number>(20);

  const dispatch = useTypeDispatch();

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    setLimit(20);
    dispatch(
      fetchLeagues({
        limit: limit,
        page: 1,
        search: "",
      })
    ).then((res) => {
      const payload = res.payload as IDataLeaguesFetch;
      const data: ISelectLegues[] = [];
      payload.data.forEach((item) => {
        data.push({
          value: String(item.id),
          label: item.league_name,
        });
      });
      setData(data);
    });
  }, []);

  return (
    <>
      <p className="mr-2 font-semibold absolute -top-4">Посик по лигам:</p>

      <Select
        className="w-40 text-left"
        showSearch
        style={{ width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={filterOption}
        options={data}
      />
    </>
  );
};

export default Leagues;
