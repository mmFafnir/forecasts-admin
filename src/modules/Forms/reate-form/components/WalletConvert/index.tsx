import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "../../../../../core/axios";
import { IWallet } from "../../../../../store/Slices/rateSlice/interface";
import { required } from "../../../../../core/form-rools";
import { notify } from "../../../../../assets/scripts/notify";
import { useTypeSelector } from "../../../../../hooks/useTypeSelector";

export const fetchWallet = async () => {
  const { data } = await axios.get("/get_wallet_currency");
  return data.data;
};

const updateWallet = async (waller: IWallet) => {
  await axios.post("/update_wallet_currency", {
    USD: waller.usd,
    EURO: waller.eu,
  });
  return waller;
};

export const WalletConvert = () => {
  const { wallet } = useTypeSelector((state) => state.rate);
  const [form] = Form.useForm<IWallet>();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: IWallet) => {
    setLoading(true);
    updateWallet(values)
      .then(() => {
        notify({
          type: "success",
          message: "Курс успешно обновлен",
        });
      })
      .catch(() => {
        notify({
          type: "error",
          message: "Ошибка! ",
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    form.setFieldsValue({
      usd: Number(wallet.usd),
      eu: Number(wallet.eu),
    });
  }, [wallet]);

  return (
    <div className="mb-2">
      <p className="text-left text-sm font-semibold mb-1">Курс:</p>
      <Form className="flex" form={form} onFinish={onFinish}>
        <Form.Item name={"usd"} noStyle rules={[required]}>
          <Input
            className="w-20 rounded-br-none rounded-tr-none"
            prefix={"usd:"}
            type="number"
          />
        </Form.Item>
        <Form.Item name={"eu"} noStyle required rules={[required]}>
          <Input className="w-20 rounded-none" prefix={"eu:"} type="number" />
        </Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="rounded-bl-none rounded-tl-none"
        >
          Сохранить
        </Button>
      </Form>
    </div>
  );
};
