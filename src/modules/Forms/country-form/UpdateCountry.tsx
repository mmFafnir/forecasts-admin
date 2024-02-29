import { FC, useEffect } from "react";
import { TypeLeague } from "../../../store/Slices/leaguesSlice/interface";
import Table, { ColumnsType } from "antd/es/table";
import { Select, Switch } from "antd";
// import axios from "axios";

interface IProps {
  leagues: TypeLeague[];
}

const columns: ColumnsType<TypeLeague> = [
  {
    title: "Лига",
    dataIndex: "league_name",
  },
  {
    title: "Тир",
    dataIndex: "tir",
  },
  {
    title: "Избранное",
    dataIndex: "favorit",
    render: (_, record) => {
      const fav = Boolean(Number(record.favorit));
      return (
        <p className="flex  w-full">
          <Switch disabled className="ml-2 pointer-events-none" checked={fav} />
        </p>
      );
    },
  },
];

// const getFreeLeagues = async () => {
//     const {data} = await axios.get('/get_league_for_connect_country');
//     return data
// }

const UpdateCountry: FC<IProps> = ({ leagues }) => {
  //   const [data, setData] = useState<SelectProps["options"]>([]);
  //   const [loading, setLoading] = useState<boolean>(false);
  //   const [loadingAdd, setLoadingAdd] = useState<boolean>(false);

  useEffect(() => {}, []);

  return (
    <div>
      <div className="mb-4">
        <Select
          //   disabled={disabled}
          mode="tags"
          //   onSearch={onSearch}
          style={{ width: "100%" }}
          //   onChange={handleChange}
          //   value={values}
          autoClearSearchValue={false}
          filterOption={(inputValue, option) => {
            return (
              String(option!.label)
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            );
          }}
          tokenSeparators={[","]}
          //   options={currentData}
        />
      </div>
      <Table dataSource={leagues} columns={columns} />
    </div>
  );
};

export default UpdateCountry;
