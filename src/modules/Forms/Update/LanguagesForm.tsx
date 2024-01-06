import { FC, useState } from "react";
import {
  IUpdateLanguages,
  TypeLanguages,
} from "../../../store/Slices/languagesSlice/interface";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { required } from "../../../core/form-rools";
import { updateLanguages } from "../../../store/Slices/languagesSlice/actions";

interface IProps {
  lang: TypeLanguages;
}
const LanguagesForm: FC<IProps> = ({ lang }) => {
  const dispatch = useTypeDispatch();
  const [form] = Form.useForm<IUpdateLanguages>();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: IUpdateLanguages) => {
    setLoading(true);
    dispatch(updateLanguages({ data: values, id: lang.id })).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Form
      form={form}
      name="lang-form"
      layout="vertical"
      style={{ maxWidth: "700px" }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
      onKeyDown={(e) => (e.keyCode == 13 ? e.preventDefault() : "")}
    >
      <div className="form-item">
        <p>Название языка </p>
        <Form.Item
          className="form-item"
          name={"name"}
          initialValue={lang.name}
          rules={[required]}
        >
          <Input enterKeyHint="next" />
        </Form.Item>
      </div>
      <div className="form-item">
        <p>Код языка </p>
        <Form.Item className="form-item" name={"url"} initialValue={lang.url}>
          <Input />
        </Form.Item>
      </div>
      <div className="form-item">
        <p>JSON </p>
        <Form.Item
          className="form-item"
          name={"lang_json"}
          initialValue={lang.lang_json}
        >
          <TextArea className="!resize-none !h-80" size="large" />
        </Form.Item>
      </div>
      <Button
        type="primary"
        size="large"
        htmlType="submit"
        loading={loading}
        className="mr-auto mt-8 flex w-44 justify-center"
      >
        Сохранить
      </Button>
    </Form>
  );
};

export default LanguagesForm;
