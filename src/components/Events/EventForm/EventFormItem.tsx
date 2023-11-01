import { Button, Form, Input, Row, Switch } from "antd";
import { FC, useEffect, useRef } from "react";
import SelectForm from "../../UI/Form/SelectForm";
import { required } from "../../../core/form-rools";
import TextEditor from "../../TextEditor";
import { TEventFormItem } from ".";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { events } from "../../../assets/data/events";
import { risks } from "../../../assets/data/risks";

const defaultEvent = {
  id: "adding",
  name: "",
  coefficient: "",
  event: "",
  risk: "",
  best_bet: false,
  text: "",
};

interface IProps {
  trigger: boolean;
  setTrigger?: (trigger: boolean) => void;
  setEvent: (event: TEventFormItem) => void;
  onDelete?: (id: string) => void;
  event?: TEventFormItem;
  type: "adding" | "editor";
}

const EventFormItem: FC<IProps> = ({
  trigger,
  setTrigger,
  setEvent,
  onDelete,
  type = "adding",
  event = defaultEvent,
}) => {
  const [form] = Form.useForm<TEventFormItem>();
  const btnSubmitRef = useRef<HTMLButtonElement | null>(null);

  const onFinish = () => {
    const currentId = type == "adding" ? "event-" + nanoid() : event.id;
    const newEvent = form.getFieldsValue();
    newEvent["id"] = currentId;
    setEvent(newEvent);

    if (type === "adding") {
      clearForm();
    }
  };

  const clearForm = () => {
    form.resetFields();
  };
  const onBtnSubmitClick = () => {
    if (!btnSubmitRef.current) return;
    btnSubmitRef.current.click();
  };

  useEffect(() => {
    if (type == "adding" && trigger) {
      onBtnSubmitClick();
    }
  }, [trigger]);

  return (
    <Form
      className=" bg-slate-300 p-3 rounded-2xl"
      name={`event-${event.id}`}
      form={form}
      layout="vertical"
      style={{ maxWidth: "500px", flex: "0 1 500px" }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={() => setTrigger && setTrigger(false)}
      autoComplete="off"
    >
      <button type="submit" ref={btnSubmitRef} className="hidden"></button>
      {/* лучшая ставка */}
      <Form.Item
        className="items-start"
        name={"best_bet"}
        initialValue={event.best_bet}
        // label="Кубок любимый"
      >
        <div className="flex form-item items-center ">
          <p className="mr-3">Лучшая ставка</p>
          <Switch
            defaultChecked={event.best_bet}
            onChange={(value) => form.setFieldsValue({ best_bet: value })}
            className="bg-slate-400"
          />

          {type == "editor" && (
            <>
              <Button
                className="ml-auto"
                type="text"
                icon={<EditOutlined />}
                onClick={onBtnSubmitClick}
              />
              <Button
                onClick={() => onDelete && onDelete(event.id)}
                type="text"
                icon={<DeleteOutlined />}
                danger
              />
            </>
          )}
        </div>
      </Form.Item>
      <Row>
        {/* Название */}
        <Form.Item
          className="mr-2 basis-auto flex-grow"
          name={"name"}
          rules={[required]}
          initialValue={event.name}
        >
          <div className="form-item">
            <p className="mb-2">Название события</p>
            <Input defaultValue={event.name} />
          </div>
        </Form.Item>

        {/* КФ */}
        <Form.Item
          className="mr-4 basis-1/5"
          name={"coefficient"}
          rules={[{ required: true, message: "" }]}
          initialValue={event.coefficient}
        >
          <div className="form-item">
            <p className="mb-2">КФ</p>
            <Input defaultValue={event.coefficient} />
          </div>
        </Form.Item>
      </Row>
      <Row>
        {/* Событие */}
        <Form.Item className="form-item mr-4" name={"event"}>
          <SelectForm
            label="Событие"
            data={events}
            defaultValue={events[0].value}
            setValue={(value) => form.setFieldsValue({ event: value })}
          />
        </Form.Item>
        {/* Риск */}
        <Form.Item className="form-item" name={"risk"}>
          <SelectForm
            label="Риск"
            data={risks}
            defaultValue={risks[0].value}
            setValue={(value) => form.setFieldsValue({ risk: value })}
          />
        </Form.Item>
      </Row>

      {/* Текст */}
      <Form.Item initialValue={event.text} name={"text"}>
        <TextEditor
          onChange={(value: string) => form.setFieldsValue({ text: value })}
          height={300}
          defaultValue={event.text}
        />
      </Form.Item>
    </Form>
  );
};

export default EventFormItem;
