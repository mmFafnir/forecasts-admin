import { FC, useEffect, useState } from "react";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd";
import { useTypeSelector } from "../../hooks/useTypeSelector";

interface IProps {
  setData: (keys: string[]) => void;
  data?: string[];
  className?: string;
  disabled?: boolean;
  values?: string[];
}

const SelectCountries: FC<IProps> = ({
  setData,
  data = [],
  disabled,
  values,
  className,
}) => {
  const { countries } = useTypeSelector((state) => state.countries);
  const [currentData, setCurrentData] = useState<SelectProps["options"]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleChange = (value: string[]) => {
    setData(value);
  };

  useEffect(() => {
    if (countries.length === 0) return;
    const newData: SelectProps["options"] = [];
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
    <Spin spinning={loading}>
      <Select
        className={className}
        disabled={disabled}
        mode="tags"
        style={{ width: "100%" }}
        defaultValue={data}
        onChange={handleChange}
        autoClearSearchValue={false}
        tokenSeparators={[","]}
        value={values}
        filterOption={(inputValue, option) =>
          String(option!.label)
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
        options={currentData}
      />
    </Spin>
  );
};

export default SelectCountries;
