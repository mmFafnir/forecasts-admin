import { FC, useEffect, useState } from "react";
import { IFaq } from "../../../store/Slices/faqSlice/interface";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { Button, Form, Input, Select } from "antd";
import { required } from "../../../core/form-rools";
import TextArea from "antd/es/input/TextArea";
import {
  deleteFaq,
  updateFaq,
} from "../../../store/Slices/faqSlice/ayncActions";

interface IProps {
  defaultFaq: IFaq | null;
  onModalClose: () => void;
}
interface IPramsInput {
  question: string;
  text: string;
  order: number;
}

const orders = new Array(20).fill(null);

const UpdateFaq: FC<IProps> = ({ defaultFaq, onModalClose }) => {
  const dispatch = useTypeDispatch();
  const [form] = Form.useForm<IPramsInput>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const onFinish = (values: IPramsInput) => {
    if (!defaultFaq) return;
    setLoading(true);
    console.log(values);
    dispatch(
      updateFaq({
        faq: {
          ru_faq: values.question,
          ru_replay: values.text,
          en_faq: values.question,
          en_replay: values.text,
          order_by: values.order,
        },
        id: defaultFaq.id,
      })
    )
      .then(() => {
        form.resetFields();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDelete = () => {
    if (!defaultFaq) return;
    setDeleteLoading(true);
    dispatch(deleteFaq(defaultFaq.id))
      .then(() => {
        onModalClose();
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  useEffect(() => {
    if (!defaultFaq) return;
    form.setFieldsValue({
      question: defaultFaq.ru_faq,
      text: defaultFaq.ru_replay,
      order: Number(defaultFaq.order_by),
    });
  }, [defaultFaq]);

  if (!defaultFaq) return <></>;
  return (
    <Form form={form} onFinish={onFinish}>
      <div className="form-item">
        <div className="flex items-center mb-2">
          <p className="mr-auto">Вопрос</p>
          <Form.Item name="order" initialValue={defaultFaq.order_by}>
            <Select
              defaultValue={{
                value: defaultFaq.order_by,
                label: `Порядок ${defaultFaq.order_by}`,
              }}
              options={orders.map((_, index) => ({
                value: index + 1,
                label: `Порядок ${index + 1}`,
              }))}
            />
          </Form.Item>
        </div>
        <Form.Item
          name={"question"}
          rules={[required]}
          initialValue={defaultFaq.ru_faq}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="form-item">
        <p>Ответ</p>
        <Form.Item
          name={"text"}
          rules={[required]}
          initialValue={defaultFaq.ru_replay}
        >
          <TextArea className="min-h-100" />
        </Form.Item>
      </div>

      <div className="flex item-center">
        <Button
          loading={deleteLoading}
          htmlType="button"
          danger
          type="primary"
          size="large"
          className="ml-auto flex"
          onClick={onDelete}
        >
          Удалить
        </Button>
        <Button
          loading={loading}
          htmlType="submit"
          type="primary"
          size="large"
          className="ml-2 flex"
        >
          Сохранить
        </Button>
      </div>
    </Form>
  );
};

export default UpdateFaq;
