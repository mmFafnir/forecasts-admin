import { AutoComplete } from "antd";
import { FC, useEffect, useState } from "react";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { fetchCountries } from "../../../store/Slices/countriesSlice/asyncActions";
import { IDataTypeCountryFetch } from "../../../store/Slices/countriesSlice/interface";
import { setSearch } from "../../../store/Slices/filterSlice";
import { useTypeSelector } from "../../../hooks/useTypeSelector";

interface ISelectCountries {
  key: string;
  value: string;
}

const Countries: FC = () => {
  const { search } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();

  const [data, setData] = useState<ISelectCountries[]>([]);
  // const [limit, setLimit] = useState<number>(20);

  const testFn = (value: string) => {
    setTimeout(() => {
      dispatch(setSearch(value));
    }, 500);
  };

  const handleOnChange = (value: string) => {
    testFn(value);
  };

  useEffect(() => {
    dispatch(
      fetchCountries({
        limit: 20,
        page: 1,
        search: search,
      })
    ).then((res) => {
      const payload = res.payload as IDataTypeCountryFetch;
      const data: ISelectCountries[] = [];
      payload.data.forEach((item) => {
        data.push({
          key: item.id,
          value: item.translation,
        });
      });
      setData(data);
    });
  }, [search]);

  return (
    <>
      <p className="mr-2 font-semibold absolute -top-4">Посик по странам:</p>
      <AutoComplete
        style={{ minWidth: 200 }}
        options={data}
        placeholder="try to type `b`"
        onChange={(value) => handleOnChange(value)}
      />
    </>
  );
};

export default Countries;
