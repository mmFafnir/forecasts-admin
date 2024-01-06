import { Button, Form, Input, Row, Switch } from "antd";
import { FC } from "react";
import SelectForm from "../../UI/Form/SelectForm";
import { required } from "../../../core/form-rools";
import TextEditor from "../../TextEditor";
import { EditOutlined } from "@ant-design/icons";
import {
  IUpdateEventMatch,
  TypeMatchEventCard,
} from "../../../store/Slices/matchesSlice/interface";
import useEventDataHook from "../../../hooks/useEventDataHook";
import useRiskDataHook from "../../../hooks/useRiskDataHook";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { updateEventMatch } from "../../../store/Slices/matchesSlice/asyncAction";
import { notify } from "../../../assets/scripts/notify";

interface IProps {
  data: TypeMatchEventCard;
}

const EventFormItem: FC<IProps> = ({ data }) => {
  const dispatch = useTypeDispatch();
  const eventsData = useEventDataHook();
  const risksData = useRiskDataHook();
  const [form] = Form.useForm<IUpdateEventMatch>();

  const updateEvent = (e: IUpdateEventMatch) => {
    dispatch(
      updateEventMatch({
        card_id: data.id,
        event_id: e.event_id,
        risk_id: e.risk_id,
        bet: e.bet,
        odds: Number(e.odds),
        why: e ? e.why : "",
      })
    )
      .then(() => {
        notify({ type: "success", message: "Событие обновлено" });
      })
      .catch(() => {
        notify({
          type: "error",
          message: `Ошибка`,
          description: "Проверьте корректно ли заполнены поля",
        });
      });
  };

  const findEventData = () =>
    eventsData.find((event) => event.value === String(data.event.id));

  const findRiskData = () =>
    risksData.find((event) => event.value === String(data.risk.id));

  return (
    <Form
      className=" bg-slate-300 p-3 rounded-2xl"
      name={`event-${data.id}`}
      form={form}
      layout="vertical"
      style={{ maxWidth: "500px", flex: "0 1 500px" }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={updateEvent}
    >
      {/* лучшая ставка */}
      <Form.Item
        className="items-start"
        name={"best_bet"}
        initialValue={data.best_bet === "Yes"}
        // label="Кубок любимый"
      >
        <div className="flex form-item items-center ">
          <p className="mr-3 !mb-0">Лучшая ставка</p>
          <Switch
            defaultChecked={data.best_bet === "Yes"}
            // onChange={(value) => form.setFieldsValue({ best_bet: value })}
            className="bg-slate-400 pointer-events-none"
          />

          <Button
            htmlType="submit"
            className="ml-auto"
            type="text"
            icon={<EditOutlined />}
          />
        </div>
      </Form.Item>
      <Row>
        {/* Название */}
        <Form.Item
          className="mr-2 basis-auto flex-grow"
          name={"bet"}
          rules={[required]}
          initialValue={data.bet}
        >
          <div className="form-item">
            <p className="mb-2">Название события</p>
            <Input defaultValue={data.bet} />
          </div>
        </Form.Item>

        {/* КФ */}
        <Form.Item
          className="mr-4 basis-1/5"
          name={"odds"}
          rules={[{ required: true, message: "" }]}
          initialValue={data.odds}
        >
          <div className="form-item">
            <p className="mb-2">КФ</p>
            <Input step={0.01} type="number" defaultValue={data.odds} />
          </div>
        </Form.Item>
      </Row>
      <Row>
        {/* Событие */}
        {eventsData.length > 0 && (
          <Form.Item
            className="form-item mr-4"
            name={"event_id"}
            initialValue={findEventData()?.value}
          >
            <SelectForm
              label="Событие"
              data={eventsData}
              defaultValue={findEventData()?.value}
              setValue={(value) => form.setFieldValue("event_id", value)}
            />
          </Form.Item>
        )}
        {/* Риск */}
        {risksData.length > 0 && (
          <Form.Item
            className="form-item"
            name={"risk_id"}
            initialValue={findRiskData()?.value}
          >
            <SelectForm
              label="Риск"
              data={risksData}
              defaultValue={findRiskData()?.value}
              setValue={(value) => form.setFieldValue("risk_id", value)}
            />
          </Form.Item>
        )}
      </Row>

      {/* Текст */}
      <Form.Item initialValue={data.why} name={"why"}>
        <TextEditor
          onChange={(value: string) => form.setFieldsValue({ why: value })}
          height={300}
          defaultValue={data.why}
        />
      </Form.Item>
    </Form>
  );
};

export default EventFormItem;
