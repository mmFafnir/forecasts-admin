import { Select, SelectProps, Spin } from "antd";
import { FC, useEffect, useState } from "react";
import { useTypeSelector } from "../../hooks/useTypeSelector";

interface IProps {
  setData: (keys: string[]) => void;
  data?: string[];
  values?: string[];
  className?: string;
  disabled?: boolean;
}

const SelectSports: FC<IProps> = ({
  setData,
  data,
  className,
  disabled,
  values = [],
}) => {
  const { sports } = useTypeSelector((state) => state.sports);
  const [currentData, setCurrentData] = useState<SelectProps["options"]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleChange = (value: string[]) => {
    setData(value);
  };

  useEffect(() => {
    if (sports.length === 0) return;
    const newData: SelectProps["options"] = [];
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
        value={values}
        options={currentData}
      />
    </Spin>
  );
};

export default SelectSports;
