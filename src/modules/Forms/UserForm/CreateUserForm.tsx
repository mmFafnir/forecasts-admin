import { Button, Form, Input, Select } from "antd";
import { FC, memo, useEffect, useState } from "react";
import { required, validEmail } from "../../../core/form-rools";
import {
  ICreateUser,
  TypeRole,
} from "../../../store/Slices/userSlices/interface";
import { asyncFetchRoles } from "./actions";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { createUser } from "../../../store/Slices/userSlices/asyncAction";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { EnumStatus } from "../../../types/Status";
import { notify } from "../../../assets/scripts/notify";

const CreateUserForm: FC = () => {
  const dispatch = useTypeDispatch();
  const [form] = Form.useForm<ICreateUser>();
  const [roles, setRoles] = useState<TypeRole[]>([]);

  const { errorMessage, status } = useTypeSelector((state) => state.user);

  const onFinish = (values: ICreateUser) => {
    dispatch(createUser(values)).then(() => {
      form.resetFields();
    });
  };

  useEffect(() => {
    if (status === EnumStatus.ERROR) {
      notify({
        type: "error",
        message: errorMessage,
      });
    }
  }, [status]);

  useEffect(() => {
    asyncFetchRoles().then((res) => {
      setRoles(res);
    });
  }, []);

  return (
    <Form form={form} onFinish={onFinish} className="form-item">
      <p>Имя пользователя:</p>
      <Form.Item name={"name"} rules={[required]}>
        <Input />
      </Form.Item>
      <p>Email:</p>
      <Form.Item name={"email"} rules={[validEmail]}>
        <Input />
      </Form.Item>
      <p>Пароль:</p>
      <Form.Item
        name={"password"}
        rules={[
          required,
          {
            min: 8,
            message: "пароль должен быть больше 8 символов",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <p>Роль:</p>
      <Form.Item name={"role_id"} rules={[required]}>
        <Select
          style={{ width: 120 }}
          placeholder={"Роль"}
          options={roles.map((rol) => ({
            label: rol.name,
            value: rol.id,
          }))}
        />
      </Form.Item>

      <div className="mt-5 flex">
        <Button
          loading={status === EnumStatus.LOADING}
          className="ml-auto"
          htmlType="submit"
          type="primary"
        >
          Создать
        </Button>
      </div>
    </Form>
  );
};

export default memo(CreateUserForm);
