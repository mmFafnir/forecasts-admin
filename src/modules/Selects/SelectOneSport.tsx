import { Select, SelectProps } from "antd";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useTypeSelector } from "../../hooks/useTypeSelector";

interface IProps {
  value: number;
  setValue: (value: number) => void;
  className?: string;
  styles?: CSSProperties;
}
const SelectOneSport: FC<IProps> = ({
  value,
  setValue,
  className,
  styles = { width: "100%" },
}) => {
  const { sports } = useTypeSelector((state) => state.sports);
  const [currentData, setCurrentData] = useState<SelectProps["options"]>([]);
  useEffect(() => {
    if (sports.length === 0) return;
    const newData: SelectProps["options"] = [];
    sports.forEach((item) => {
      newData.push({
        label: `${item.name}`,
        value: item.id,
      });
    });
    setCurrentData(newData);
  }, [sports]);
  return (
    <Select
      className={className}
      style={styles}
      value={value}
      onChange={setValue}
      options={currentData}
    />
  );
};

export default SelectOneSport;
