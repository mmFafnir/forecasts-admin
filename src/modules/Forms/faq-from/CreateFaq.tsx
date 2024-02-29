import { Button, Form, Input, Select } from "antd";
import { FC, useState } from "react";
import { required } from "../../../core/form-rools";
import TextArea from "antd/es/input/TextArea";
import { postFaq } from "../../../store/Slices/faqSlice/ayncActions";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";

interface IPramsInput {
  question: string;
  text: string;
  order: number;
}

const orders = new Array(20).fill(null);

const CreateFaq: FC = () => {
  const dispatch = useTypeDispatch();
  const [form] = Form.useForm<IPramsInput>();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: IPramsInput) => {
    setLoading(true);
    console.log(values);
    dispatch(
      postFaq({
        ru_faq: values.question,
        order_by: values.order,
        ru_replay: values.text,
      })
    )
      .then(() => {
        form.resetFields();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <div className="form-item">
        <div className="flex items-center mb-2">
          <p className="mr-auto">Вопрос</p>
          <Form.Item name="order" initialValue={1}>
            <Select
              defaultValue={{
                value: 1,
                label: `Порядок ${1}`,
              }}
              options={orders.map((_, index) => ({
                value: index + 1,
                label: `Порядок ${index + 1}`,
              }))}
            />
          </Form.Item>
        </div>
        <Form.Item name={"question"} rules={[required]}>
          <Input />
        </Form.Item>
      </div>
      <div className="form-item">
        <p>Ответ</p>
        <Form.Item name={"text"} rules={[required]}>
          <TextArea className="min-h-100" />
        </Form.Item>
      </div>

      <Button
        loading={loading}
        htmlType="submit"
        type="primary"
        size="large"
        className="ml-auto flex"
      >
        Сохранить
      </Button>
    </Form>
  );
};

export default CreateFaq;
