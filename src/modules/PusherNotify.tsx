import { FC, useEffect } from "react";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { Button, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPusherMessage } from "../store/Slices/pusherSlice";

const PusherNotify: FC = () => {
  const { id } = useParams();
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
    console.log(id === String(message.parent_id));
    notifyApi.info({
      message: "Уведомление",
      description: message.message,
      duration: 10,
      btn: id && id !== String(message.parent_id) && (
        <Button type="primary" onClick={goMatch}>
          Перейти
        </Button>
      ),
    });
    dispatch(setPusherMessage(null));
  }, [message]);

  return <> {contextHolder}</>;
};

export default PusherNotify;
