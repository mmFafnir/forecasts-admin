import { Button, Form, Input } from "antd";
import { FC, useEffect, useState } from "react";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { IParamsLanguages } from "../../../store/Slices/languagesSlice/interface";
import TextArea from "antd/es/input/TextArea";
import { required } from "../../../core/form-rools";
import { createLanguage } from "../../../store/Slices/languagesSlice/asyncAactions";
import { notify } from "../../../assets/scripts/notify";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { EnumStatus } from "../../../types/Status";

const CreateLanguage: FC = () => {
  const { status } = useTypeSelector((state) => state.languages);
  const dispatch = useTypeDispatch();

  const [form] = Form.useForm<IParamsLanguages>();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: IParamsLanguages) => {
    console.log(values);
    setLoading(true);
    dispatch(createLanguage(values))
      .then(() => {
        notify({
          type: "success",
          message: "Язык создан",
        });
      })
      .finally(() => {
        setLoading(false);
        form.resetFields();
      });
  };

  useEffect(() => {
    console.log(status);
    if (status === EnumStatus.ERROR) {
      notify({
        type: "error",
        message: "Ошибка",
        description: "Попробуйте чуть позже",
      });
    }
  }, [status]);

  return (
    <Form
      form={form}
      name="bookmaker-create-form"
      layout="vertical"
      style={{ maxWidth: "700px" }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <div className="form-item">
        <p>Язык</p>
        <Form.Item name={"name"} rules={[required]}>
          <Input />
        </Form.Item>
      </div>
      <div className="form-item">
        <p>Код языка</p>
        <Form.Item name={"url"} rules={[required]}>
          <Input />
        </Form.Item>
      </div>
      <div className="form-item">
        <p>Макросы</p>
        <Form.Item name={"lang_json"}>
          <TextArea className="!resize-none !h-56" size="large" />
        </Form.Item>
      </div>
      <div className="flex">
        <Button
          htmlType="submit"
          className="ml-auto"
          size="large"
          type="primary"
          loading={loading}
        >
          Сохранить
        </Button>
      </div>
    </Form>
  );
};

export default CreateLanguage;
