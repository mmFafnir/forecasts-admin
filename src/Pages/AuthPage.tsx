import { FC } from "react";
import LoginForm from "../modules/Forms/LoginForm";
import { Layout } from "antd";

const AuthPage: FC = () => {
  return (
    <Layout className="app">
      <div
        className="min-h-screen flex  justify-center items-start"
        style={{ paddingTop: "10%" }}
      >
        <div className="flex-initial basis-96 bg-slate-300 p-5 rounded-2xl">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
