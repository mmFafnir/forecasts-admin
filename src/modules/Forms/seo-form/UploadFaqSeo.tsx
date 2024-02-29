import { Button, Form, Input } from "antd";
import { FC, useState } from "react";
import { IFaqSeo } from "../../../store/Slices/seoSlice/interface";
import { required } from "../../../core/form-rools";
import { updateFaqSeo } from "../../../store/Slices/seoSlice/asyncActions";
import { notify } from "../../../assets/scripts/notify";
import { AxiosError } from "axios";

interface IInputs {
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_h: string;
  seo_short_description_for_h: string;
}

interface IProps {
  seo: IFaqSeo;
}
const titleClasses = `text-left font-semibold text-sm mb-2`;
const UploadFaqSeo: FC<IProps> = ({ seo }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm<IInputs>();

  const onFinish = (values: IInputs) => {
    setLoading(true);
    updateFaqSeo(values)
      .then(() => {
        notify({
          type: "success",
          message: "Успешно",
          description: `Seo тест успешно обнавлен`,
        });
      })
      .catch((error) => {
        const err = error as AxiosError;
        notify({
          type: "error",
          message: `Ошибка ${err.code}`,
          description: err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      style={{ maxWidth: "700px" }}
      autoComplete="off"
      onFinish={onFinish}
    >
      {/* ceo_title */}
      <div>
        <p className={titleClasses}>Заголовок</p>
        <Form.Item
          className="mr-3"
          name="seo_title"
          rules={[required]}
          initialValue={seo.seo_title}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_description */}
      <div>
        <p className={titleClasses}>Описание</p>
        <Form.Item
          className="mr-3"
          name="seo_description"
          rules={[required]}
          initialValue={seo.seo_description}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_keywords */}
      <div>
        <p className={titleClasses}>Ключевые слова</p>
        <Form.Item
          className="mr-3"
          name="seo_keywords"
          rules={[required]}
          initialValue={seo.seo_keywords}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_h */}
      <div>
        <p className={titleClasses}>H1 заголовок</p>
        <Form.Item
          className="mr-3"
          name="seo_h"
          rules={[required]}
          initialValue={seo.seo_h}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_short_description_for_h */}
      <div>
        <p className={titleClasses}>H1 подзаголовок</p>
        <Form.Item
          className="mr-3"
          name="seo_short_description_for_h"
          rules={[required]}
          initialValue={seo.seo_short_description_for_h}
        >
          <Input />
        </Form.Item>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className="ml-auto flex font-semibold"
        loading={loading}
      >
        Сохранить
      </Button>
    </Form>
  );
};

export default UploadFaqSeo;
