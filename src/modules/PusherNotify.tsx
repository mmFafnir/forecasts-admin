import { FC, useEffect } from "react";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { Button, notification } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPusherMessage } from "../store/Slices/pusherSlice";

import sound from "../assets/sound/blob.mp3";
const audio = new Audio(sound);

const PusherNotify: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const { message } = useTypeSelector((state) => state.pusher);
  const dispatch = useDispatch();
  const [notifyApi, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const goMatch = () => {
    if (!message) return;
    navigate(`/matches/${message.parent_id}`);
  };

  useEffect(() => {
    if (!message) return;
    console.log(message);
    notifyApi.info({
      message: "Уведомление",
      description: message.message,
      duration: 30,
      key: message.parent_id,
      btn: id !== String(message.parent_id) && (
        <Button type="primary" onClick={goMatch}>
          Перейти
        </Button>
      ),
    });
    audio.play();
    dispatch(setPusherMessage(null));
  }, [message]);

  useEffect(() => {
    if (!location.pathname.includes("/matches") || !id) return;
    notifyApi.destroy(Number(id));
  }, [id]);

  return <> {contextHolder}</>;
};

export default PusherNotify;
