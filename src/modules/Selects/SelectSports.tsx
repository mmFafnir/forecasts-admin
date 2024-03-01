import { Select, SelectProps, Spin } from "antd";
import { FC, useEffect, useState } from "react";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { DefaultOptionType } from "antd/es/select";

interface IProps {
  setData: (keys: string[]) => void;
  data?: string[];
  values?: string[];
  className?: string;
  disabled?: boolean;
  all?: boolean;
}

const SelectSports: FC<IProps> = ({
  setData,
  data,
  className,
  disabled,
  values,
  all,
}) => {
  const { sports } = useTypeSelector((state) => state.sports);
  const [currentData, setCurrentData] = useState<SelectProps["options"]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentValues, setCurrentValues] = useState<string[]>(
    values || data || []
  );
  const handleChange = (
    value: string[],
    option: DefaultOptionType | DefaultOptionType[]
  ) => {
    console.log(option);

    if (value.find((val) => val === "all")) {
      setCurrentValues(["all"]);
      setData(["all"]);
      return;
    }
    const res = option
      .map((opt: DefaultOptionType) => opt.value)
      .filter((val: string) => val);

    setCurrentValues(res);
    setData(res);
  };

  useEffect(() => {
    if (!values) return;
    setCurrentValues(values);
  }, [values]);

  useEffect(() => {
    if (sports.length === 0) return;
    const newData: SelectProps["options"] = all
      ? [{ label: `Все`, value: "all" }]
      : [];
    sports.forEach((item) => {
      newData.push({
        label: `${item.name}`,
        value: String(item.id),
      });
    });
    setCurrentData(newData);
    setLoading(false);
  }, [sports]);

  return (
    <Spin spinning={loading}>
      <Select
        className={className}
        disabled={disabled}
        mode="tags"
        style={{ width: "100%" }}
        onChange={handleChange}
        autoClearSearchValue={false}
        filterOption={(inputValue, option) =>
          String(option!.label)
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
        tokenSeparators={[","]}
        defaultValue={data}
        value={currentValues}
        options={currentData}
      />
    </Spin>
  );
};

export default SelectSports;
