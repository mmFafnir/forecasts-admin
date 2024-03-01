import { FC, useEffect, useState } from "react";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { DefaultOptionType } from "antd/es/select";

interface IProps {
  setData: (keys: string[]) => void;
  data?: string[];
  className?: string;
  disabled?: boolean;
  values?: string[];
  all?: boolean;
}

const SelectCountries: FC<IProps> = ({
  setData,
  data = [],
  disabled,
  values,
  className,
  all,
}) => {
  const { countries } = useTypeSelector((state) => state.countries);
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
    if (countries.length === 0) return;
    const newData: SelectProps["options"] = all
      ? [{ label: `Все`, value: "all" }]
      : [];
    countries.forEach((item) => {
      newData.push({
        label: `${item.name} (${item.translation})`,
        value: String(item.id),
      });
    });
    setCurrentData(newData);
    setLoading(false);
  }, [countries]);

  return (
    <div className={className}>
      <Spin spinning={loading}>
        <Select
          disabled={disabled}
          mode="tags"
          style={{ width: "100%" }}
          defaultValue={data}
          onChange={handleChange}
          autoClearSearchValue={false}
          tokenSeparators={[","]}
          value={currentValues}
          filterOption={(inputValue, option) =>
            String(option!.label)
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          options={currentData}
        />
      </Spin>
    </div>
  );
};

export default SelectCountries;
