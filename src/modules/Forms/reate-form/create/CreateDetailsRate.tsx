import { Button, Form, Input, Switch } from "antd";
import { FC, FormEvent, useState } from "react";
import { required } from "../../../../core/form-rools";
import { useTypeDispatch } from "../../../../hooks/useTypeDispatch";
import { createDetailsRate } from "../../../../store/Slices/rateSlice/asyncActions";
import { notify } from "../../../../assets/scripts/notify";
import { useTypeSelector } from "../../../../hooks/useTypeSelector";

interface IInputs {
  name: string;
  rate_id: number;

  price_rub: string;
  price_usd: string;
  price_euro: string;

  work_day: string;
  work_month: string;
  work_year: string;

  saved_price_rub: string;
  saved_price_usd: string;
  saved_price_euro: string;

  day_price_rub: string;
  day_price_usd: string;
  day_price_euro: string;

  price_rub_with_bonus: string;
  price_usd_with_bonus: string;
  price_euro_with_bonus: string;

  bonus_day: string;
  bonus_percent: string;
}

interface IProps {
  id?: string;
}

export const CreateDetailsRate: FC<IProps> = ({ id }) => {
  const { wallet } = useTypeSelector((state) => state.rate);

  const dispatch = useTypeDispatch();
  const [form] = Form.useForm<IInputs>();

  const [isFree, setIsFree] = useState<boolean>(false);
  const [isUse, setIsUse] = useState<boolean>(false);

  const [startTariffe, setStartTariffe] = useState<boolean>(false);
  const [hasTop, setHasTop] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const onChangeRub = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    if (target.id.includes("rub")) {
      const usd = (target.value / wallet.usd).toFixed(2);
      const eu = String((target.value / wallet.eu).toFixed(2));

      form.setFieldValue(target.id.replace("rub", "usd"), usd);
      form.setFieldValue(target.id.replace("rub", "euro"), eu);
    }
  };

  const onFinish = (values: IInputs) => {
    if (!id) return;
    setLoading(true);

    dispatch(
      createDetailsRate({
        has_top: hasTop ? 1 : 0,
        start_tariffe: startTariffe ? 1 : 0,

        name: values.name,
        price_rub: values.price_rub || "0",
        price_usd: values.price_usd || "0",
        price_euro: values.price_euro || "0",

        saved_price_rub: values.saved_price_rub || "0",
        saved_price_usd: values.saved_price_usd || "0",
        saved_price_euro: values.saved_price_euro || "0",

        day_price_rub: values.day_price_rub || "0",
        day_price_usd: values.day_price_usd || "0",
        day_price_euro: values.day_price_euro || "0",

        price_rub_with_bonus: values.price_rub_with_bonus || "0",
        price_usd_with_bonus: values.price_usd_with_bonus || "0",
        price_euro_with_bonus: values.price_euro_with_bonus || "0",

        work_day: values.work_day || "0",
        work_month: values.work_month || "0",
        work_year: values.work_year || "0",

        bonus_day: values.bonus_day,
        bonus_percent: values.bonus_percent,
        free_or_not: isFree ? 1 : 0,
        show_status: isUse ? 0 : 1,
        rate_id: Number(id),
      })
    )
      .then((res) => {
        if (!res.payload) {
          notify({
            type: "error",
            message: "Ошибка!",
          });
          return;
        }
        notify({
          type: "success",
          message: "Элемент успешно создан!",
        });
        form.resetFields();
      })
      .finally(() => setLoading(false));
  };

  if (!id) return <></>;
  return (
    <Form
      onChange={onChangeRub}
      form={form}
      layout="vertical"
      style={{ maxWidth: "700px" }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <div className="form-item">
        <p>Название:</p>
        <Form.Item name={"name"} rules={[required]}>
          <Input />
        </Form.Item>
      </div>
      <div className="flex ">
        <div className="form-item mb-2 flex item-center">
          <p className="!mb-0 mr-2">Бесплатно:</p>
          <Switch
            style={{ marginTop: 2 }}
            checkedChildren="Да"
            unCheckedChildren="Нет"
            checked={isFree}
            onChange={setIsFree}
          />
        </div>
        <div className="form-item mb-2 flex item-center ml-4">
          <p className="!mb-0 mr-2">Используется:</p>
          <Switch
            style={{ marginTop: 2 }}
            checkedChildren="Да"
            unCheckedChildren="Нет"
            checked={isUse}
            onChange={setIsUse}
          />
        </div>
      </div>

      <div className="flex ">
        <div className="form-item mb-2 flex item-center">
          <p className="!mb-0 mr-2">Стартовый тариф:</p>
          <Switch
            style={{ marginTop: 2 }}
            checkedChildren="Да"
            unCheckedChildren="Нет"
            checked={startTariffe}
            onChange={setStartTariffe}
          />
        </div>
        <div className="form-item mb-2 flex item-center ml-4">
          <p className="!mb-0 mr-2">Популярный:</p>
          <Switch
            style={{ marginTop: 2 }}
            checkedChildren="Да"
            unCheckedChildren="Нет"
            checked={hasTop}
            onChange={setHasTop}
          />
        </div>
      </div>

      {/* {!isFree && ( */}
      {/* <div style={{ display: !isFree ? "block" : "none" }}> */}
      <div className="form-item mb-2">
        <p>Цены:</p>
        <div className="flex">
          <Form.Item name={"price_rub"} noStyle>
            <Input
              prefix={"rub"}
              type="number"
              className="rounded-br-none rounded-tr-none"
            />
          </Form.Item>
          <Form.Item name={"price_usd"} noStyle>
            <Input prefix={"usd"} type="number" className="rounded-none" />
          </Form.Item>
          <Form.Item name={"price_euro"} noStyle>
            <Input
              prefix={"eu"}
              type="number"
              className="rounded-bl-none rounded-tl-none"
            />
          </Form.Item>
        </div>
      </div>

      <div className="form-item mb-2">
        <p>Цена за один день:</p>
        <div className="flex">
          <Form.Item name={"day_price_rub"} noStyle>
            <Input
              prefix={"rub"}
              type="number"
              className="rounded-br-none rounded-tr-none"
            />
          </Form.Item>
          <Form.Item name={"day_price_usd"} noStyle>
            <Input prefix={"usd"} type="number" className="rounded-none" />
          </Form.Item>
          <Form.Item name={"day_price_euro"} noStyle>
            <Input
              prefix={"eu"}
              type="number"
              className="rounded-bl-none rounded-tl-none"
            />
          </Form.Item>
        </div>
      </div>

      <div className="form-item mb-2">
        <p>Экономия:</p>
        <div className="flex">
          <Form.Item name={"saved_price_rub"} noStyle>
            <Input
              prefix={"rub"}
              type="number"
              className="rounded-br-none rounded-tr-none"
            />
          </Form.Item>
          <Form.Item name={"saved_price_usd"} noStyle>
            <Input prefix={"usd"} type="number" className="rounded-none" />
          </Form.Item>
          <Form.Item name={"saved_price_euro"} noStyle>
            <Input
              prefix={"eu"}
              type="number"
              className="rounded-bl-none rounded-tl-none"
            />
          </Form.Item>
        </div>
      </div>
      {/* </div> */}
      {/* )} */}

      <div className="form-item mb-2">
        <p>Переод:</p>
        <div className="flex">
          <Form.Item name={"work_day"} noStyle>
            <Input
              prefix={"День"}
              type="number"
              className="rounded-br-none rounded-tr-none"
            />
          </Form.Item>
          <Form.Item name={"work_month"} noStyle>
            <Input prefix={"Месяц"} type="number" className="rounded-none" />
          </Form.Item>
          <Form.Item name={"work_year"} noStyle>
            <Input
              prefix={"Год"}
              type="number"
              className="rounded-bl-none rounded-tl-none"
            />
          </Form.Item>
        </div>
      </div>

      <div className="form-item ">
        <p>Бонусный день:</p>
        <Form.Item name={"bonus_day"} rules={[required]}>
          <Input type="number" />
        </Form.Item>
      </div>

      <div className="form-item">
        <p>Бонус:</p>
        <Form.Item name={"bonus_percent"}>
          <Input type="number" />
        </Form.Item>
      </div>

      {/* {!isFree && ( */}
      <div
        className="form-item"
        // style={{ display: !isFree ? "block" : "none" }}
      >
        <p>Конечная цена:</p>
        <div className="flex">
          <Form.Item name={"price_rub_with_bonus"} noStyle>
            <Input
              prefix={"rub"}
              type="number"
              className="rounded-br-none rounded-tr-none"
            />
          </Form.Item>
          <Form.Item name={"price_usd_with_bonus"} noStyle>
            <Input prefix={"usd"} type="number" className="rounded-none" />
          </Form.Item>
          <Form.Item name={"price_euro_with_bonus"} noStyle>
            <Input
              prefix={"eu"}
              type="number"
              className="rounded-bl-none rounded-tl-none"
            />
          </Form.Item>
        </div>
      </div>
      {/* )} */}

      <div className="flex mt-5">
        <Button
          htmlType="submit"
          className="ml-auto"
          size="large"
          type="primary"
          loading={loading}
        >
          Сохранить
        </Button>
      </div>
    </Form>
  );
};
