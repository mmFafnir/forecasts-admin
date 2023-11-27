import { Button, Form, Input, Row, Switch } from "antd";
import { FC } from "react";
import SelectForm from "../../UI/Form/SelectForm";
import { required } from "../../../core/form-rools";
import TextEditor from "../../TextEditor";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { TypeMatchEventCard } from "../../../store/Slices/matchesSlice/interface";
import useRiskDataHook from "../../../hooks/useRiskDataHook";
import useEventDataHook from "../../../hooks/useEventDataHook";

const EventFormCreate: FC = () => {
  const { events } = useTypeSelector((state) => state.events);
  const { risks } = useTypeSelector((state) => state.risks);

  const eventsData = useEventDataHook();
  const risksData = useRiskDataHook();

  const [form] = Form.useForm<TypeMatchEventCard>();

  const onFinish = () => {
    clearForm();
  };

  const clearForm = () => {
    form.resetFields();
  };

  const findEvent = (id: string | number) =>
    events.find((evt) => String(evt.id) === id)!;

  const findRisk = (id: string | number) =>
    risks.find((risk) => String(risk.id) === id)!;

  return (
    <Form
      className=" bg-slate-300 p-3 rounded-2xl"
      name={`event-create`}
      form={form}
      layout="vertical"
      style={{ maxWidth: "500px", flex: "0 1 500px" }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinish}
      autoComplete="off"
    >
      {/* лучшая ставка */}
      <Form.Item
        className="items-start"
        name={"best_bet"}
        // label="Кубок любимый"
      >
        <div className="flex form-item items-center ">
          <p className="mr-3 !mb-0">Лучшая ставка</p>
          <Switch
            // onChange={(value) => form.setFieldsValue({ best_bet: value })}
            className="bg-slate-400"
          />
          <Button className="ml-auto" type="primary">
            Добавить событие
          </Button>
        </div>
      </Form.Item>
      <Row>
        {/* Название */}
        <Form.Item
          className="mr-2 basis-auto flex-grow"
          name={"name"}
          rules={[required]}
          initialValue={""}
        >
          <div className="form-item">
            <p className="mb-2">Название события</p>
            <Input />
          </div>
        </Form.Item>

        {/* КФ */}
        <Form.Item
          className="mr-4 basis-1/5"
          name={"coefficient"}
          rules={[{ required: true, message: "" }]}
        >
          <div className="form-item">
            <p className="mb-2">КФ</p>
            <Input />
          </div>
        </Form.Item>
      </Row>
      <Row>
        {/* Событие */}
        {eventsData.length > 0 && (
          <Form.Item className="form-item mr-4" name={"event"}>
            <SelectForm
              label="Событие"
              data={eventsData}
              setValue={(value) => findEvent(value)}
            />
          </Form.Item>
        )}
        {/* Риск */}
        {risksData.length > 0 && (
          <Form.Item className="form-item" name={"risk"}>
            <SelectForm
              label="Риск"
              data={risksData}
              setValue={(value) => findRisk(value)}
            />
          </Form.Item>
        )}
      </Row>

      {/* Текст */}
      <Form.Item name={"text"}>
        <TextEditor
          onChange={(value: string) => form.setFieldsValue({ why: value })}
          height={300}
        />
      </Form.Item>
    </Form>
  );
};

export default EventFormCreate;
