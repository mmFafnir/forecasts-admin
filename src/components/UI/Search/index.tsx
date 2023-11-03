import SearchAnt from "antd/es/input/Search";
import { FC, useEffect } from "react";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { useLocation } from "react-router-dom";
import { setSearch } from "../../../store/Slices/filterSlice";

const Search: FC = () => {
  const location = useLocation();
  const dispatch = useTypeDispatch();

  const onSearch = (value: string) => dispatch(setSearch(value));
  useEffect(() => {
    dispatch(setSearch(""));
  }, [location]);

  return (
    <div className="flex justify-end mb-3">
      <SearchAnt
        onSearch={onSearch}
        placeholder="Поиск..."
        className="max-w-md"
      />
    </div>
  );
};

export default Search;
