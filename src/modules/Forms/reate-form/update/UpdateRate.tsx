import { FC, useEffect, useState } from "react";
import {
  IRateFetchSingle,
  IUpdateRate,
  TypeRateDetail,
} from "../../../../store/Slices/rateSlice/interface";
import { Table } from "../components/Table";
import { useTypeSelector } from "../../../../hooks/useTypeSelector";
import { useTypeDispatch } from "../../../../hooks/useTypeDispatch";
import { clearDetailRate } from "../../../../store/Slices/rateSlice";
import { Button, Form, Input } from "antd";
import { required } from "../../../../core/form-rools";
import { updateShowRate } from "../../../../store/Slices/rateSlice/asyncActions";
import { notify } from "../../../../assets/scripts/notify";

interface IInputs {
  bonus: string;
}

interface IProps {
  data: IRateFetchSingle | null;
}
export const UpdateRate: FC<IProps> = ({ data }) => {
  const [form] = Form.useForm<IInputs>();

  const [loading, setLoading] = useState<boolean>(false);

  const { detailRate, typeDetailRate, deleteRate } = useTypeSelector(
    (state) => state.rate
  );
  const dispatch = useTypeDispatch();
  const [details, setDetails] = useState<TypeRateDetail[]>(
    data?.rate_detail || []
  );

  console.log(data);

  const onUpdate = (values: IInputs) => {
    if (!data) return;
    setLoading(true);
    dispatch(
      updateShowRate({
        rate_id: data.id,
        bonus: values.bonus,
        show_status: data.show_status,
      })
    )
      .then((res) => {
        console.log(res);
        if (!res.payload) {
          notify({
            type: "error",
            message: "Ошибка при обновлении",
          });
          return;
        }
        setDetails((prev) =>
          prev.map((rate) => {
            rate.bonus_percent = (res.payload as IUpdateRate).bonus;
            return rate;
          })
        );
        notify({
          type: "success",
          message: "Тариф успешно обновлен",
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!detailRate) return;
    if (typeDetailRate === "create") {
      setDetails((prev) => [detailRate, ...prev]);
    }
    if (typeDetailRate === "update") {
      console.log("update");
      setDetails((prev) =>
        prev.map((det) => {
          if (det.id === detailRate.id) return detailRate;
          return det;
        })
      );
    }
    dispatch(clearDetailRate());
  }, [detailRate]);

  useEffect(() => {
    if (!deleteRate) return;
    setDetails((prev) => prev.filter((det) => det.id !== deleteRate));
    dispatch(clearDetailRate());
  }, [deleteRate]);

  return (
    <div className="text-left">
      <Form
        className="mr-11 "
        form={form}
        onFinish={onUpdate}
        labelAlign="left"
      >
        <Form.Item
          name={"bonus"}
          rules={[required]}
          labelCol={{
            prefixCls: "font-semibold !text-sm",
          }}
          label={"Общий бонус"}
          initialValue={data?.bonus}
        >
          <Input className="block w-16" size="small" />
        </Form.Item>
        <Button
          loading={loading}
          htmlType="submit"
          className="block"
          type="primary"
        >
          Сохранить
        </Button>
      </Form>
      <Table data={details} />
    </div>
  );
};
