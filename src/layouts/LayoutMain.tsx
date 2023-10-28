import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FC } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TableMatch from "../components/Tables/TableMatch";

const LayoutMain: FC = () => {
  return (
    <div className="w-full">
      <Layout className="min-h-screen">
        <Sidebar />
        <Layout>
          <Header />
          <Content style={contentStyle}>
            <div className="p-5">
              <TableMatch />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  backgroundColor: "#F6F6F6",
};

export default LayoutMain;
