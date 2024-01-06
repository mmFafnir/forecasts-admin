import { FC, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { TypePrompt } from "../../../store/Slices/promptsSlice/interface";
import { Button, Form, Spin, notification } from "antd";
import { required } from "../../../core/form-rools";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { updatePrompts } from "../../../store/Slices/promptsSlice/asyncActions";

interface IProps {
  prompt: TypePrompt;
}

interface FormValues {
  description: string;
}

const PromptForm: FC<IProps> = ({ prompt }) => {
  const dispatch = useTypeDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const [form] = Form.useForm<FormValues>();

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    dispatch(
      updatePrompts({
        description: values.description,
        promt_id: prompt.id,
      })
    )
      .then(() => {
        notification.success({
          message: `Промт №${prompt.id}`,
          description: "Промт успешно обновлен",
          duration: 2,
        });
      })
      .catch((err) => {
        notification.error({
          message: `Ошибка ${err.code}`,
          description: err.message,
          duration: 3,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setDisabled(prompt.description == form.getFieldValue("description"));
  }, [prompt]);

  return (
    <Form
      form={form}
      name={"prompt-" + prompt.id}
      className="mb-4 max-w-3xl"
      onFinish={onSubmit}
    >
      <div className="flex mb-2 items-center justify-between">
        <h2 className="text-left text-lg">Промт {prompt.id}</h2>
        <div className="text-right">
          {prompt.created_at && (
            <p className="first:mb-1">
              Дата создание:{" "}
              <span className="font-semibold">
                {dayjs(prompt.created_at).format("DD.MM.YYYY")}
              </span>
            </p>
          )}
          {prompt.updated_at && (
            <p>
              Дата обнавления:{" "}
              <span className="font-semibold">
                {dayjs(prompt.updated_at).format("DD.MM.YYYY")}
              </span>
            </p>
          )}
        </div>
      </div>
      <Form.Item
        className="!mb-2"
        name={"description"}
        rules={[required]}
        initialValue={prompt.description}
      >
        <TextArea
          key={prompt.id}
          size="large"
          className="!h-80"
          value={prompt.description}
          onChange={(e) => setDisabled(e.target.value == prompt.description)}
        />
      </Form.Item>

      <Button
        className="w-28 block"
        size="large"
        type="primary"
        htmlType="submit"
        disabled={disabled}
        loading={loading}
      >
        Сохранить
      </Button>
    </Form>
  );
};

export default PromptForm;

export const PromptFromLoading: FC = () => {
  return (
    <div className="mb-4 max-w-3xl">
      <Spin size="large">
        <div className="flex mb-2 items-center justify-between">
          <h2 className="text-left text-lg">Промт</h2>
          <div className="text-right"></div>
        </div>
        <div className="!mb-2">
          <TextArea size="large" className="!h-80" />
        </div>

        <Button
          className="w-28 block"
          size="large"
          type="primary"
          htmlType="submit"
          disabled
        >
          Сохранить
        </Button>
      </Spin>
    </div>
  );
};
