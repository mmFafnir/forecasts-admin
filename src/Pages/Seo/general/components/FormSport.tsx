import { Form, Input } from "antd";
import { required } from "../../../../core/form-rools";
import TextArea from "antd/es/input/TextArea";
import { ISeo } from "../../../../store/Slices/seoSlice/interface";
import { FC, useEffect } from "react";

interface IInputs {
  ceo_title: string;
  ceo_description: string;
  ceo_keywords: string;
  ceo_h: string;
  ceo_short_description_for_h: string;
  ceo_text: string;
}

interface IProps {
  data: ISeo | null;
}

const titleClasses = `text-left  mb-2`;
export const FormSport: FC<IProps> = ({ data }) => {
  const [form] = Form.useForm<IInputs>();

  useEffect(() => {
    if (!data) return;
    form.setFieldsValue(data);
  }, [data]);

  return (
    <Form form={form} name="sports" className="mb-10">
      <h2 className="font-semibold text-xs text-left mb-4">Вид Спорта</h2>
      {/* ceo_title */}
      <div>
        <p className={titleClasses}>Заголовок:</p>
        <Form.Item
          name="ceo_title"
          rules={[required]}
          initialValue={data?.ceo_title}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_description */}
      <div>
        <p className={titleClasses}>Описание:</p>
        <Form.Item
          name="ceo_description"
          rules={[required]}
          initialValue={data?.ceo_description || ""}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_keywords */}
      <div>
        <p className={titleClasses}>Ключевые слова:</p>
        <Form.Item
          name="ceo_keywords"
          rules={[required]}
          initialValue={data?.ceo_keywords || ""}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_h */}
      <div>
        <p className={titleClasses}>H1 заголовок:</p>
        <Form.Item
          name="ceo_h"
          rules={[required]}
          initialValue={data?.ceo_h || ""}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_short_description_for_h */}
      <div>
        <p className={titleClasses}>H1 подзаголовок:</p>
        <Form.Item
          className="mr-3"
          name="ceo_short_description_for_h"
          rules={[required]}
          initialValue={data?.ceo_short_description_for_h || ""}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_text */}
      <div>
        <p className={titleClasses}>Текст:</p>
        <Form.Item
          name="ceo_text"
          rules={[required]}
          initialValue={data?.ceo_text || ""}
        >
          <TextArea style={{ minHeight: 150 }} />
        </Form.Item>
      </div>
    </Form>
  );
};
