import { Button, Form, Input } from "antd";
import { FC, useEffect } from "react";
import { ISeo } from "../../../../store/Slices/seoSlice/interface";
import { defaultSeo } from "../const/defaultSeo";

interface IProps {
  title: string;
  page: string;
  data: ISeo | null;
}

interface IInputs {
  ceo_title: string;
  ceo_description: string;
  ceo_keywords: string;
  ceo_h: string;
  ceo_short_description_for_h: string;
  ceo_text: string;
}

const titleClasses = `text-left  mb-2`;
export const FormOther: FC<IProps> = ({ title, page, data }) => {
  const [form] = Form.useForm<IInputs>();

  useEffect(() => {
    if (!data) {
      form.setFieldsValue(defaultSeo);
      return;
    }
    form.setFieldsValue(data);
  }, [data]);

  return (
    <Form form={form} className="mb-10 last:mb-0" name={page}>
      <h2 className="font-semibold text-xs text-left mb-4">{title}</h2>
      {/* ceo_title */}
      <div>
        <p className={titleClasses}>Заголовок:</p>
        <Form.Item initialValue={""} name="ceo_title">
          <Input />
        </Form.Item>
      </div>

      {/* ceo_description */}
      <div>
        <p className={titleClasses}>Описание:</p>
        <Form.Item initialValue={""} name="ceo_description">
          <Input />
        </Form.Item>
      </div>

      {/* ceo_keywords */}
      <div>
        <p className={titleClasses}>Ключевые слова:</p>
        <Form.Item initialValue={""} name="ceo_keywords">
          <Input />
        </Form.Item>
      </div>

      {/* ceo_h */}
      <div>
        <p className={titleClasses}>H1 заголовок:</p>
        <Form.Item initialValue={""} name="ceo_h">
          <Input />
        </Form.Item>
      </div>

      {/* ceo_short_description_for_h */}
      {/* <div>
        <p className={titleClasses}>H1 подзаголовок:</p>
        <Form.Item className="mr-3" name="ceo_short_description_for_h">
          <Input />
        </Form.Item>
      </div> */}

      {page === "match" && (
        <div className="flex mt-10">
          <Button
            className="ml-auto w-full"
            size="large"
            type="primary"
            htmlType="submit"
          >
            Сохранить
          </Button>
        </div>
      )}
    </Form>
  );
};
