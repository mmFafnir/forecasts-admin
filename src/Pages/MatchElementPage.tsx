import { FC, useEffect, useState } from "react";
import MatchEditForm from "../modules/Forms/Update/MatchEditForm";
import { TypeMatch } from "../store/Slices/matchesSlice/interface";
import { useParams } from "react-router-dom";
import { Space, Spin } from "antd";
import { useTypeSelector } from "../hooks/useTypeSelector";
import axios from "../core/axios";

const MatchElementPage: FC = () => {
  const { id } = useParams();
  const { message } = useTypeSelector((state) => state.pusher);
  const [match, setMatch] = useState<TypeMatch | null>(null);

  const getSinglePageMatch = async (id: string) => {
    try {
      const { data } = await axios.get(`/single_page_match/match_id=${id}`);
      setMatch(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!message || !id) return;
    if (message.parent_id !== Number(id)) return;
    setMatch(null);
    getSinglePageMatch(id);
  }, [message]);

  useEffect(() => {
    setMatch(null);
    if (!id) return;
    getSinglePageMatch(id);
  }, [id]);

  console.log(match);

  return (
    <div className="form">
      <h1 className="mb-5">Редактировать Матч</h1>
      {match ? (
        <MatchEditForm match={match} />
      ) : (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      )}
    </div>
  );
};

export default MatchElementPage;
