import { FC, useEffect, useState } from "react";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { fetchCountries } from "../../../store/Slices/countriesSlice/asyncActions";
import { IDataTypeCountryFetch } from "../../../store/Slices/countriesSlice/interface";
import CustomAutoComplete, {
  ISelectDataAutoComplete,
} from "../../UI/Search/CustomAutoComplete";
import { setCountry } from "../../../store/Slices/filterSlice";

const Countries: FC = () => {
  const dispatch = useTypeDispatch();
  const [data, setData] = useState<ISelectDataAutoComplete[]>([]);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);

  const addLimit = () => setLimit((prev) => prev + 20);
  const onChange = (value: string, key?: number | string) => {
    setSearch(value);
    dispatch(setCountry(key ? String(key) : ""));
  };

  const getCountries = (value: string) => {
    setLoading(true);
    dispatch(
      fetchCountries({
        limit: limit,
        page: 1,
        search: value,
      })
    )
      .then((res) => {
        const payload = res.payload as IDataTypeCountryFetch;
        const data: ISelectDataAutoComplete[] = [];
        console.log(payload.data);
        payload.data.forEach((item) => {
          data.push({
            key: item.code,
            value: `${item.translation} (${item.name})`,
          });
        });
        setEmpty(payload.total === data.length);
        setData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCountries(search);
  }, [search, limit]);

  return (
    <>
      <p className="mr-2 font-semibold absolute -top-4">Посик по странам:</p>
      <CustomAutoComplete
        loading={loading}
        setLimit={addLimit}
        data={data}
        setSearch={onChange}
        empty={empty}
      />
    </>
  );
};

export default Countries;
