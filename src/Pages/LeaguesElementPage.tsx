import axios from "../core/axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TypeLeague } from "../store/Slices/leaguesSlice/interface";
import LeagueForm from "../modules/Forms/LeagueForm";
import { Space, Spin } from "antd";

const LeaguesElementPage: FC = () => {
  const { id } = useParams();

  const [league, setLeague] = useState<null | TypeLeague>(null);

  const getSinglePageLeague = async (id: string) => {
    try {
      const { data } = await axios.post(`/single_page_league?league_id=${id}`);
      setLeague(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    getSinglePageLeague(id);
  }, []);

  return (
    <div className="form">
      <h1 className="mb-5">Редактировать Лигу</h1>
      {!league ? (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      ) : (
        <LeagueForm league={league} />
      )}
    </div>
  );
};

export default LeaguesElementPage;
