import { FC, useEffect, useState } from "react";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { fetchCountries } from "../../../store/Slices/countriesSlice/asyncActions";
import { IDataTypeCountryFetch } from "../../../store/Slices/countriesSlice/interface";
import CustomAutoComplete, {
  ISelectDataAutoComplete,
} from "../../UI/Search/CustomAutoComplete";

const Countries: FC = () => {
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
      fetchCountries({
        limit: limit,
        page: 1,
        search: search,
      })
    )
      .then((res) => {
        const payload = res.payload as IDataTypeCountryFetch;
        const data: ISelectDataAutoComplete[] = [];
        payload.data.forEach((item) => {
          data.push({
            key: item.id,
            value: `${item.translation} (${item.name})`,
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
      <p className="mr-2 font-semibold absolute -top-4">Посик по странам:</p>
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

export default Countries;
