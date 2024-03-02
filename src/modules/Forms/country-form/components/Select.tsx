import { FC, useEffect, useState } from "react";
import {
  // IDataLeaguesFetch,
  TypeLeague,
} from "../../../../store/Slices/leaguesSlice/interface";
import { Select, SelectProps, Spin } from "antd";
import axios from "../../../../core/axios";
// import { getScrollPos } from "../../../../assets/scripts/getScrollPos";

interface IParams {
  page: string;
  search: string;
}
const getFreeLeagues = async (params: IParams) => {
  const { page = 1, search = "" } = params;

  const { data } = await axios.get(
    `/get_league_for_connect_country?search=${search}&page=${page}`
  );
  return data.data;
};

interface IProps {
  setData: (data: number[]) => void;
  data: number[];
}

let timerId: NodeJS.Timeout | undefined = undefined;

export const SelectLigCountry: FC<IProps> = ({ setData, data }) => {
  const [currentData, setCurrentData] = useState<SelectProps["options"]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  // const [page, setPage] = useState<string | null>("1");

  const onSearch = (value: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      setSearch(value);
    }, 400);
  };

  // const onScroll = (e: UIEvent<HTMLElement>) => {
  //   const target = e.target as HTMLElement;
  //   const scrollDiv = target.parentElement?.querySelector(
  //     ".rc-virtual-list-scrollbar-vertical"
  //   );
  //   if (!scrollDiv) return;

  //   if (getScrollPos(scrollDiv.children[0] as HTMLElement).bottom <= 10) {
  //     if (loading || !page) return;
  //     onFetchLeagues();
  //   }
  // };

  const onFetchLeagues = () => {
    setLoading(true);
    getFreeLeagues({
      page: "",
      search: search,
    })
      .then((res) => {
        const payload = res as TypeLeague[];
        const data: SelectProps["options"] = [];
        payload.forEach((item) => {
          data.push({
            label: `${item.league_name}`,
            value: item.id,
          });
        });
        // if (payload.next_page_url) {
        //   const match = payload.next_page_url.match(/page=(\d+)/);
        //   if (!match) return setPage(null);
        //   const pageNumber = parseInt(match[1], 10);
        //   setPage(String(pageNumber));
        // }
        // if (!newPage) {
        //   setCurrentData((prev) => (prev ? [...prev, ...data] : [...data]));
        // } else {
        setCurrentData(data);
        // }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChange = (value: number[]) => {
    setData(value);
  };

  useEffect(() => {
    onFetchLeagues();
  }, [search]);

  useEffect(() => {}, [currentData]);

  return (
    <Spin spinning={loading}>
      <Select
        loading={loading}
        mode="tags"
        onSearch={onSearch}
        style={{ width: "100%" }}
        onChange={handleChange}
        autoClearSearchValue={false}
        filterOption={(inputValue, option) => {
          return (
            String(option!.label)
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          );
        }}
        tokenSeparators={[","]}
        value={data}
        options={currentData}
        // onPopupScroll={onScroll}
      />
    </Spin>
  );
};
