import { FC, useState } from "react";
import { TypeLeague } from "../../../store/Slices/leaguesSlice/interface";
import Table, { ColumnsType } from "antd/es/table";
import { Button, Switch } from "antd";
import { SelectLigCountry } from "./components/Select";
import axios from "../../../core/axios";

interface IProps {
  id: string;
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

const postLigConnection = async (ids: number[], countryId: string) => {
  const { data } = await axios.post("/conection_league_for_country", {
    country_id: Number(countryId),
    league_ids: ids,
  });
  return data;
};

const UpdateCountry: FC<IProps> = ({ leagues, id }) => {
  const [currentLeagues, setCurrentLeagues] = useState<TypeLeague[]>(leagues);
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(data);
  const onConnection = () => {
    setLoading(true);
    postLigConnection(data, id)
      .then((res) => {
        console.log(res.data?.league);
        if (res.data[0]?.league) {
          setCurrentLeagues(res.data[0]?.league);
          setData([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex">
          <Button
            className="mb-2 ml-auto"
            type="primary"
            onClick={onConnection}
            loading={loading}
          >
            Добавить
          </Button>
        </div>
        <SelectLigCountry data={data} setData={setData} />
      </div>
      <Table dataSource={currentLeagues} columns={columns} />
    </div>
  );
};

export default UpdateCountry;
