import { FC, useState } from "react";
import TableRate from "../../components/Tables/TableRate";
import { Button, Input } from "antd";
import { useTypeDispatch } from "../../hooks/useTypeDispatch";
import { createRate } from "../../store/Slices/rateSlice/asyncActions";
import { notify } from "../../assets/scripts/notify";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { WalletConvert } from "../../modules/Forms/reate-form/components/WalletConvert";

export const RatePage: FC = () => {
  const { rates } = useTypeSelector((state) => state.rate);
  const dispatch = useTypeDispatch();
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onCreate = () => {
    setLoading(true);
    dispatch(createRate(value))
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
          message: "Тариф успешно создан",
        });
        setValue("");
      })
      .finally(() => setLoading(false));
  };

  console.log(rates);

  return (
    <>
      <div className="flex items-center">
        <h1>ТАРИФЫ</h1>
      </div>
      <div className="mt-6 flex max-w-sm mb-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
        />
        <Button
          style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
          type="primary"
          onClick={onCreate}
          loading={loading}
          disabled={
            value.trim().length === 0 ||
            Boolean(rates.find((rate) => rate.name == value))
          }
        >
          Создать
        </Button>
      </div>
      <div>
        <WalletConvert />
      </div>
      <TableRate />
    </>
  );
};
