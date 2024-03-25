import { Button, Form, Input, Row, Select, Switch } from "antd";
import { FC, useState } from "react";
import SelectForm from "../../UI/Form/SelectForm";
import { required } from "../../../core/form-rools";
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
import TextArea from "antd/es/input/TextArea";
import axios from "../../../core/axios";

interface IRenderSelect {
  label: string;
  value: string;
}
const renderTranslateSelect = (
  languages: Pick<TypeMatchEventCard, "translate">
): IRenderSelect[] => {
  const res: IRenderSelect[] = [];
  languages.translate.forEach((item) => {
    res.push({
      value: item.lang.url,
      label: item.lang.name,
    });
  });

  return res;
};

interface IWhyText {
  why: string;
  whyBest?: string | null;
}

interface IProps {
  data: TypeMatchEventCard;
}

const postAccessEvent = async (id: string | number) => {
  const { data } = await axios.post("/change_card_access", {
    card_id: id,
  });
  return data;
};

const EventFormItem: FC<IProps> = ({ data }) => {
  const dispatch = useTypeDispatch();
  const eventsData = useEventDataHook();
  const risksData = useRiskDataHook();
  const [form] = Form.useForm<IUpdateEventMatch>();

  const [accessEvent, setAccessEvent] = useState<boolean>(data.status == "1");
  const [accessEventLoading, setAccessEventLoading] = useState<boolean>(false);

  const [whyText, setWhyText] = useState<IWhyText>({
    why: data.why,
    whyBest: data.why_best,
  });

  const updateEvent = (e: IUpdateEventMatch) => {
    dispatch(
      updateEventMatch({
        card_id: data.id,
        event_id: e.event_id,
        risk_id: e.risk_id,
        bet: e.bet,
        odds: Number(e.odds),
        why: e ? e.why : "",
        why_best: e ? e.why_best : "",
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

  const onChangeLang = (lang: string) => {
    const texts = data.translate.find((item) => item.lang.url === lang);
    if (!texts) return;
    form.setFieldValue("why", texts.why);
    form.setFieldValue("why_best", texts.why_best);

    setWhyText({
      why: texts.why,
      whyBest: texts.why_best,
    });
  };

  const changeAccessEvent = () => {
    setAccessEventLoading(true);
    setAccessEvent((prev) => !prev);
    postAccessEvent(data.id)
      .catch(() => {
        setAccessEvent((prev) => !prev);
      })
      .finally(() => {
        setAccessEventLoading(false);
      });
  };

  const findEventData = () =>
    eventsData.find((event) => event.value === String(data.event.id));

  const findRiskData = () =>
    risksData.find((event) => event.value === String(data.risk?.id || "")) ||
    risksData[0];

  return (
    <Form
      className=" bg-slate-300 p-3 rounded-2xl"
      name={`event-${data.id}`}
      form={form}
      layout="vertical"
      style={{ flex: "1 1 100%" }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={updateEvent}
    >
      {/* лучшая ставка */}
      <div className="flex form-item items-center mb-2">
        <p className="mr-3 !mb-0">Лучшая ставка</p>
        <Form.Item
          className="!mb-0"
          name={"best_bet"}
          initialValue={data.best_bet === "Yes"}
        >
          <Switch
            checked={data.best_bet === "Yes"}
            className="bg-slate-400 pointer-events-none"
          />
        </Form.Item>
        {/* Ставка прошла/не прошла */}
        <p className="mr-3 ml-3 !mb-0">Ставка прошла</p>
        <Switch
          onChange={changeAccessEvent}
          checked={accessEvent}
          loading={accessEventLoading}
          checkedChildren="Да"
          unCheckedChildren="Нет"
          className="bg-slate-400 "
        />

        <Select
          rootClassName="text-left"
          options={renderTranslateSelect({ translate: data.translate })}
          defaultValue={"ru"}
          style={{ maxWidth: 200 }}
          className=" ml-auto mr-1"
          onChange={(value) => onChangeLang(value)}
        />
        <Button htmlType="submit" type="text" icon={<EditOutlined />} />
      </div>

      <Row>
        {/* Название */}
        <Form.Item
          className="mr-2 basis-auto flex-grow"
          name={"bet"}
          rules={[required]}
          initialValue={data.bet}
        >
          <div className="form-item">
            <p className="mb-2">Ставка</p>
            <Input defaultValue={data.bet} />
          </div>
        </Form.Item>

        {/* КФ */}
        <Form.Item
          className=" basis-1/5"
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
            className="form-item mr-2 flex-auto"
            name={"event_id"}
            initialValue={findEventData()?.value}
          >
            <SelectForm
              styles={{ width: "100%" }}
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
            className="form-item basis-1/5"
            name={"risk_id"}
            initialValue={findRiskData()?.value}
          >
            <SelectForm
              styles={{ width: "100%" }}
              label="Риск"
              data={risksData}
              defaultValue={findRiskData()?.value}
              setValue={(value) => form.setFieldValue("risk_id", value)}
            />
          </Form.Item>
        )}
      </Row>

      {/* Текст */}
      <div className="flex">
        <div className="flex-1 mb-0">
          <p className="text-left mb-1">Анализ события:</p>
          <Form.Item initialValue={whyText.why} name={"why"}>
            <TextArea autoSize={{ minRows: 9, maxRows: 40 }} />
          </Form.Item>
        </div>
        {whyText.whyBest && (
          <div className="flex-1 ml-2">
            <p className="text-left mb-1">Анализ события лучшей ставки:</p>
            <Form.Item initialValue={whyText.whyBest} name={"why_best"}>
              <TextArea autoSize={{ minRows: 9, maxRows: 40 }} />
            </Form.Item>
          </div>
        )}
      </div>
    </Form>
  );
};

export default EventFormItem;
