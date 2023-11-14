import axios from "../core/axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeamEditForm from "../modules/Forms/TeamEditForm";
import { ITeam } from "../store/Slices/teamsSlice/interface";
import { Space, Spin } from "antd";

const TeamsElementPage: FC = () => {
  const { id } = useParams();

  const [team, setTeam] = useState<ITeam | null>(null);

  const getSinglePageCommand = async (id: string) => {
    try {
      const { data } = await axios.get(`/single_page_command?team_id=${id}`);
      setTeam(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    getSinglePageCommand(id);
  }, []);

  // if (!team) return <></>;
  return (
    <div className="form">
      <h1 className="mb-5">Редактирование Команды</h1>
      {!team ? (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      ) : (
        <TeamEditForm team={team} />
      )}
    </div>
  );
};

export default TeamsElementPage;
