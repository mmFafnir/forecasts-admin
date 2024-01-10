import { FC, useEffect, useState } from "react";
import {
  ICreateUser,
  TypeRole,
  TypeUser,
} from "../../../store/Slices/userSlices/interface";
import { Button, Form, Input, Select } from "antd";
import { required, validEmail } from "../../../core/form-rools";
import { asyncFetchRoles } from "./actions";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { updateAdmin } from "../../../store/Slices/userSlices/asyncAction";
import { notify } from "../../../assets/scripts/notify";

interface IProps {
  user: TypeUser;
}
const UpdateAdminForm: FC<IProps> = ({ user }) => {
  const dispatch = useTypeDispatch();
  const [form] = Form.useForm<ICreateUser>();
  const [roles, setRoles] = useState<TypeRole[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: ICreateUser) => {
    setLoading(true);
    dispatch(updateAdmin({ id: user.id, data: values })).finally(() => {
      setLoading(false);
      notify({
        type: "success",
        message: `Администратор ${user.name} обнавлен`,
      });
    });
  };

  useEffect(() => {
    asyncFetchRoles().then((res) => {
      setRoles(res);
    });
  }, []);

  return (
    <Form
      form={form}
      className="form-item"
      name="user-form"
      layout="vertical"
      style={{ maxWidth: "700px" }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      initialValues={{ remember: true }}
    >
      <p>Имя:</p>
      <Form.Item name={"name"} initialValue={user.name} rules={[required]}>
        <Input />
      </Form.Item>

      <p>Email:</p>
      <Form.Item name={"email"} initialValue={user.email} rules={[validEmail]}>
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
      {roles && (
        <Form.Item
          name={"role_id"}
          rules={[required]}
          initialValue={user.role_id}
        >
          <Select
            placeholder={"Роль"}
            className="text-left"
            value={user.role_id}
            options={roles.map((rol) => ({
              label: rol.name,
              value: String(rol.id),
            }))}
          />
        </Form.Item>
      )}

      <Button
        type="primary"
        htmlType="submit"
        className="block mr-auto"
        loading={loading}
      >
        Сохранить
      </Button>
    </Form>
  );
};

export default UpdateAdminForm;
