import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FC } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const LayoutMain: FC = () => {
  return (
    <div className="app">
      <div className="w-full">
        <Layout className="min-h-screen pb-24">
          <Sidebar />
          <Layout>
            <Header />
            <Content style={contentStyle} className="p-8">
              <Outlet />
            </Content>
          </Layout>
        </Layout>
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
