import { Button, Form, Input, Switch } from "antd";
import { FC, useEffect, useState } from "react";
import { required } from "../../../../core/form-rools";
import { useTypeDispatch } from "../../../../hooks/useTypeDispatch";
import {
  deleteDetailsRate,
  updateDetailsRate,
} from "../../../../store/Slices/rateSlice/asyncActions";
import { notify } from "../../../../assets/scripts/notify";
import { TypeRateDetail } from "../../../../store/Slices/rateSlice/interface";

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

  price_euro_with_bonus: string;
  price_usd_with_bonus: string;
  price_rub_with_bonus: string;

  day_price_rub: string;
  day_price_usd: string;
  day_price_euro: string;

  show_status: 0 | 1;

  bonus_day: string;
  bonus_percent: string;
}

interface IProps {
  data: TypeRateDetail | null;
  onClose: () => void;
}

export const UpdateDetailsRate: FC<IProps> = ({ data, onClose }) => {
  const [currentData, setCurrentData] = useState<TypeRateDetail | null>(data);

  const dispatch = useTypeDispatch();
  const [form] = Form.useForm<IInputs>();
  const [isFree, setIsFree] = useState(data?.free_or_not == "1");
  const [isUse, setIsUse] = useState(data?.show_status == 1);

  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const onFinish = (values: IInputs) => {
    if (!data) return;
    setLoading(true);
    console.log(values);
    dispatch(
      updateDetailsRate({
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

        work_day: values.work_day,
        work_month: values.work_month,
        work_year: values.work_year,

        bonus_day: values.bonus_day,
        bonus_percent: values.bonus_percent,
        free_or_not: isFree ? 1 : 0,
        rate_detail_id: data.id,

        price_euro_with_bonus: values.price_euro_with_bonus || "0",
        price_usd_with_bonus: values.price_usd_with_bonus || "0",
        price_rub_with_bonus: values.price_rub_with_bonus || "0",

        show_status: isUse ? 1 : 0,
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
          message: "Элемент успешно обновлен!",
        });
        onClose();
        setTimeout(() => {
          form.resetFields();
        }, 100);
      })
      .finally(() => setLoading(false));
  };

  const onDelete = () => {
    if (!data) return;
    setLoadingDelete(true);
    dispatch(deleteDetailsRate(data.id))
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
          message: "Элемент успешно удален",
        });
        onClose();
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  useEffect(() => {
    if (!data) return;
    setCurrentData(data);
    form.setFieldsValue({
      name: data.name,
      price_rub: data.price_rub || "0",
      price_usd: data.price_usd || "0",
      price_euro: data.price_euro || "0",

      saved_price_rub: data.saved_price_rub || "0",
      saved_price_usd: data.saved_price_usd || "0",
      saved_price_euro: data.saved_price_euro || "0",

      day_price_rub: data.day_price_rub || "0",
      day_price_usd: data.day_price_usd || "0",
      day_price_euro: data.day_price_euro || "0",

      price_euro_with_bonus: data.price_euro_with_bonus || "0",
      price_usd_with_bonus: data.price_usd_with_bonus || "0",
      price_rub_with_bonus: data.price_rub_with_bonus || "0",

      work_day: data.work_day || "",
      work_month: data.work_month || "",
      work_year: data.work_year || "",

      bonus_day: data.bonus_day || "",
      bonus_percent: data.bonus_percent || "",
    });
    setIsFree(data?.free_or_not == "1");
    setIsUse(data?.show_status == 1);
  }, [data]);

  if (!currentData) return <></>;
  return (
    <Form
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
        <Form.Item
          name={"name"}
          rules={[required]}
          initialValue={currentData.name}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="flex">
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
      {!isFree && (
        <>
          <div className="form-item mb-2">
            <p>Цены:</p>
            <div className="flex">
              <Form.Item
                name={"price_rub"}
                rules={[required]}
                initialValue={currentData.price_rub}
                noStyle
              >
                <Input
                  prefix={"rub"}
                  type="number"
                  className="rounded-br-none rounded-tr-none"
                />
              </Form.Item>
              <Form.Item
                name={"price_usd"}
                rules={[required]}
                initialValue={currentData.price_usd}
                noStyle
              >
                <Input prefix={"usd"} type="number" className="rounded-none" />
              </Form.Item>
              <Form.Item
                name={"price_euro"}
                rules={[required]}
                initialValue={currentData.price_euro}
                noStyle
              >
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
              <Form.Item
                name={"day_price_rub"}
                rules={[required]}
                initialValue={currentData.day_price_rub}
                noStyle
              >
                <Input
                  prefix={"rub"}
                  type="number"
                  className="rounded-br-none rounded-tr-none"
                />
              </Form.Item>
              <Form.Item
                name={"day_price_usd"}
                rules={[required]}
                initialValue={currentData.day_price_usd}
                noStyle
              >
                <Input prefix={"usd"} type="number" className="rounded-none" />
              </Form.Item>
              <Form.Item
                name={"day_price_euro"}
                rules={[required]}
                initialValue={currentData.day_price_euro}
                noStyle
              >
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
              <Form.Item
                name={"saved_price_rub"}
                rules={[required]}
                initialValue={currentData.saved_price_rub}
                noStyle
              >
                <Input
                  prefix={"rub"}
                  type="number"
                  className="rounded-br-none rounded-tr-none"
                />
              </Form.Item>
              <Form.Item
                name={"saved_price_usd"}
                rules={[required]}
                initialValue={currentData.saved_price_usd}
                noStyle
              >
                <Input prefix={"usd"} type="number" className="rounded-none" />
              </Form.Item>
              <Form.Item
                name={"saved_price_euro"}
                rules={[required]}
                initialValue={currentData.saved_price_euro}
                noStyle
              >
                <Input
                  prefix={"eu"}
                  type="number"
                  className="rounded-bl-none rounded-tl-none"
                />
              </Form.Item>
            </div>
          </div>
        </>
      )}

      <div className="form-item mb-2">
        <p>Переод:</p>
        <div className="flex">
          <Form.Item
            name={"work_day"}
            initialValue={currentData.work_day}
            noStyle
          >
            <Input
              prefix={"День"}
              type="number"
              className="rounded-br-none rounded-tr-none"
            />
          </Form.Item>
          <Form.Item
            name={"work_month"}
            initialValue={currentData.work_month}
            noStyle
          >
            <Input prefix={"Месяц"} type="number" className="rounded-none" />
          </Form.Item>
          <Form.Item
            name={"work_year"}
            initialValue={currentData.work_year}
            noStyle
          >
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
        <Form.Item
          name={"bonus_day"}
          rules={[required]}
          initialValue={currentData.bonus_day}
        >
          <Input type="number" />
        </Form.Item>
      </div>

      <div className="form-item">
        <p>Бонус:</p>
        <Form.Item
          name={"bonus_percent"}
          rules={[required]}
          initialValue={currentData.bonus_percent}
        >
          <Input type="number" />
        </Form.Item>
      </div>

      {!isFree && (
        <div className="form-item">
          <p>Конечная цена:</p>
          <div className="flex">
            <Form.Item
              name={"price_rub_with_bonus"}
              rules={[required]}
              initialValue={currentData.price_rub_with_bonus}
              noStyle
            >
              <Input
                prefix={"rub"}
                type="number"
                className="rounded-br-none rounded-tr-none"
              />
            </Form.Item>
            <Form.Item
              name={"price_usd_with_bonus"}
              rules={[required]}
              initialValue={currentData.price_usd_with_bonus}
              noStyle
            >
              <Input prefix={"usd"} type="number" className="rounded-none" />
            </Form.Item>
            <Form.Item
              name={"price_euro_with_bonus"}
              initialValue={currentData.price_euro_with_bonus}
              rules={[required]}
              noStyle
            >
              <Input
                prefix={"eu"}
                type="number"
                className="rounded-bl-none rounded-tl-none"
              />
            </Form.Item>
          </div>
        </div>
      )}

      <div className="flex mt-5 items-center">
        <Button
          danger
          className="ml-auto mr-2"
          size="large"
          type="primary"
          loading={loadingDelete}
          onClick={onDelete}
        >
          Удалить
        </Button>
        <Button htmlType="submit" size="large" type="primary" loading={loading}>
          Сохранить
        </Button>
      </div>
    </Form>
  );
};
