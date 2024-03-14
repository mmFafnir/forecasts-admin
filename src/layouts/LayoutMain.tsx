import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FC, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import PusherNotify from "../modules/PusherNotify";
import Pusher from "pusher-js/with-encryption";
import { useTypeDispatch } from "../hooks/useTypeDispatch";
import { IStatePusher, setPusherMessage } from "../store/Slices/pusherSlice";
import GetAllCountries from "./GetAllCountries";
import GetAllSports from "./GetAllSports";
import GetAllGeneral from "./GetAllGeneral";

const LayoutMain: FC = () => {
  const dispatch = useTypeDispatch();

  const Pushers = async () => {
    const pusher = new Pusher(process.env.PUSHER_KEY as string, {
      cluster: process.env.PUSHER_CLUSTER as string,
    });
    const channel = pusher.subscribe("AiSportacle");
    channel.bind("App\\Events\\NewNotification", function (data: IStatePusher) {
      console.log(data);
      if (!data.message) return;
      if (data.message.type == "new_message_for_chat_gpt_match") {
        dispatch(setPusherMessage(data.message));
      }
    });
  };

  useEffect(() => {
    Pushers();
  }, []);

  return (
    <div className="app">
      <div className="w-full">
        <Layout className="min-h-screen">
          <Sidebar />
          <Layout>
            <Header />
            <Content style={contentStyle} className="p-8">
              <Outlet />
            </Content>
          </Layout>
        </Layout>
        <PusherNotify />
        <GetAllCountries />
        <GetAllSports />
        <GetAllGeneral />
        {/* <GetAllLeagues /> */}
      </div>
    </div>
  );
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  backgroundColor: "#F6F6F6",
};

export default LayoutMain;
