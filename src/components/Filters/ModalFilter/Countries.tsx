import { FC, useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { ISelectDataAutoComplete } from "../../UI/Search/CustomAutoComplete";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { setCountry } from "../../../store/Slices/filterSlice";

type TypeOptions = {
  value: string;
  key: number | string;
};
const Countries: FC = () => {
  const { countries } = useTypeSelector((state) => state.countries);
  const dispatch = useTypeDispatch();
  const [data, setData] = useState<ISelectDataAutoComplete[]>([]);
  const onSearch = (value: string, options: TypeOptions) => {
    const { key } = options;
    if (value.length > 0 && !key) return;
    dispatch(setCountry(key ? String(key) : ""));
  };

  useEffect(() => {
    const newData: ISelectDataAutoComplete[] = [];
    countries.forEach((item) => {
      newData.push({
        key: item.code,
        value: `${item.name} (${item.translation})`,
      });
    });
    setData(newData);
  }, [countries]);

  // [...countries.map(country => ({
  //   key: country.code,
  //   value: country.name
  // })]
  return (
    <>
      <p className="mr-2 font-semibold absolute -top-4">Посик по странам:</p>
      <AutoComplete
        style={{ width: 200 }}
        options={data}
        placeholder="Поиск..."
        className="text-left"
        onChange={(value, options) => onSearch(value, options as TypeOptions)}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </>
  );
};

export default Countries;
