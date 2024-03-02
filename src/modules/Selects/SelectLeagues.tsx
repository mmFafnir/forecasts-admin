import { Select, SelectProps, Spin } from "antd";
import { FC, UIEvent, useEffect, useState } from "react";
import { fetchLeagues } from "../../store/Slices/leaguesSlice/asyncActions";
import { IDataLeaguesFetch } from "../../store/Slices/leaguesSlice/interface";
import { useTypeDispatch } from "../../hooks/useTypeDispatch";
import { getScrollPos } from "../../assets/scripts/getScrollPos";
import { DefaultOptionType } from "antd/es/select";

interface IProps {
  setData: (keys: string[]) => void;
  data?: string[];
  values?: string[];
  className?: string;
  disabled?: boolean;
  all?: boolean;
}
let timerId: NodeJS.Timeout | undefined = undefined;
const SelectLeagues: FC<IProps> = ({
  setData,
  data,
  className,
  disabled,
  values,
  all,
}) => {
  const dispatch = useTypeDispatch();
  // const { leagues } = useTypeSelector((state) => state.leagues);
  const [currentData, setCurrentData] = useState<SelectProps["options"]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [empty, setEmpty] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(20);

  const [currentValues, setCurrentValues] = useState<string[]>(
    values || data || []
  );

  const handleChange = (
    value: string[],
    option: DefaultOptionType | DefaultOptionType[]
  ) => {
    console.log(option);

    if (value.find((val) => val === "all")) {
      setCurrentValues(["all"]);
      setData(["all"]);
      return;
    }
    const res = option
      .map((opt: DefaultOptionType) => opt.value)
      .filter((val: string) => val);

    setCurrentValues(res);
    setData(res);
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
        const data: SelectProps["options"] = all
          ? [{ label: `Все`, value: "all" }]
          : [];
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
    <div className={className}>
      <Spin spinning={loading}>
        <Select
          disabled={disabled}
          mode="tags"
          onSearch={onSearch}
          style={{ width: "100%" }}
          onChange={handleChange}
          value={values || currentValues}
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
    </div>
  );
};

export default SelectLeagues;
