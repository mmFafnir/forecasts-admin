import { Select, SelectProps, Spin } from "antd";
import { FC, UIEvent, useEffect, useState } from "react";
import { fetchLeagues } from "../../store/Slices/leaguesSlice/asyncActions";
import { IDataLeaguesFetch } from "../../store/Slices/leaguesSlice/interface";
import { useTypeDispatch } from "../../hooks/useTypeDispatch";
import { getScrollPos } from "../../assets/scripts/getScrollPos";

interface IProps {
  setData: (keys: string[]) => void;
  data?: string[];
  values?: string[];
  className?: string;
  disabled?: boolean;
}
let timerId: NodeJS.Timeout | undefined = undefined;
const SelectLeagues: FC<IProps> = ({
  setData,
  data,
  className,
  disabled,
  values = [],
}) => {
  const dispatch = useTypeDispatch();
  // const { leagues } = useTypeSelector((state) => state.leagues);
  const [currentData, setCurrentData] = useState<SelectProps["options"]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [empty, setEmpty] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(20);

  const handleChange = (value: string[]) => {
    setData(value);
  };

  const onSearch = (value: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      setSearch(value);
    }, 400);
  };

  const onScroll = (e: UIEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const scrollDiv = target.parentElement?.querySelector(
      ".rc-virtual-list-scrollbar-vertical"
    );
    if (!scrollDiv) return;
    if (getScrollPos(scrollDiv.children[0] as HTMLElement).bottom == 0) {
      if (loading || empty) return;
      setLimit((prev) => prev + 20);
    }
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
        const data: SelectProps["options"] = [];
        payload.data.forEach((item) => {
          data.push({
            label: `${item.league_name}`,
            value: item.league_id,
          });
        });
        setEmpty(payload.total === data.length);
        setCurrentData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, limit]);

  return (
    <Spin spinning={loading}>
      <Select
        className={className}
        disabled={disabled}
        mode="tags"
        onSearch={onSearch}
        style={{ width: "100%" }}
        onChange={handleChange}
        value={values}
        autoClearSearchValue={false}
        filterOption={(inputValue, option) => {
          return (
            String(option!.label)
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          );
        }}
        tokenSeparators={[","]}
        onPopupScroll={onScroll}
        defaultValue={data}
        options={currentData}
      />
    </Spin>
  );
};

export default SelectLeagues;

// useEffect(() => {
//   if (leagues.length === 0) return;
//   const newData: SelectProps["options"] = [];
//   leagues.forEach((item) => {
//     newData.push({
//       label: `${item.translate || item.league_name}`,
//       value: String(item.id),
//     });
//   });
//   setCurrentData(newData);
//   setLoading(false);
// }, [leagues]);
