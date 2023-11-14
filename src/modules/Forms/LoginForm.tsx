import { Button, Form, Input, notification } from "antd";
import Password from "antd/es/input/Password";
import { FC, useEffect, useState } from "react";
import { required, validEmail } from "../../core/form-rools";
import axios from "../../core/axios";
import { AxiosError } from "axios";

// import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  // const cookies = new Cookies(null, { path: "/" });
  const navigate = useNavigate();
  const [form] = Form.useForm<ILoginForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const redirect = () => {
    notification.destroy();
    navigate("/matches");
  };

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const params = form.getFieldsValue();
      const { data } = await axios.post("/login", params);

      window.localStorage.setItem("_token", data.token);
      // cookies.set("_token", data.token);

      notification.success({
        message: `Вы успешно вошли`,
        description:
          "Сейчас будет редирект в админку AiBetGur, удачной работы ;)",
        duration: 2,
        btn: <Button onClick={redirect}>Перейти</Button>,
      });

      setTimeout(() => {
        redirect();
      }, 1000);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      notification.error({
        message: `Ошибка ${err.response ? err.response.status : ""}`,
        description: "Неверный логин или пароль",
        duration: 5,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    notification.info({
      message: "Дефолтный пользователь для входа",
      description: (
        <>
          <p>e-mail: Admin@mail.ru</p>
          <p>пароль: 11111111</p>
        </>
      ),
      placement: "topLeft",
      onClose: () => {},
    });
  }, []);

  return (
    <div className="w-full">
      <h1 className="mb-6">Авторизация</h1>
      <Form
        form={form}
        name="login"
        layout="vertical"
        style={{ maxWidth: "1000px" }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onLogin}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name={"email"} rules={[validEmail]}>
          <div className="form-item">
            <p className="mb-2">E-mail</p>
            <Input />
          </div>
        </Form.Item>
        <Form.Item name={"password"} rules={[required]}>
          <div className="form-item">
            <p className="mb-2">Пароль</p>
            <Password />
          </div>
        </Form.Item>
        <Button
          loading={isLoading}
          className="mt-5 w-24"
          htmlType="submit"
          type="primary"
        >
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
