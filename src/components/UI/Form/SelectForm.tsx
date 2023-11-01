import { Select } from "antd";
import { FC } from "react";

type TData = {
  value: string;
  label: string;
};

interface IProps {
  data: TData[];
  setValue: (value: string) => void;
  label?: string;
  defaultValue?: string;
}

const SelectForm: FC<IProps> = ({
  data,
  setValue,
  label,
  defaultValue = data[0].value,
}) => {
  return (
    <div>
      {label && <p className="mb-2 text-left">{label}</p>}
      <Select
        defaultValue={defaultValue}
        className="text-left"
        style={{ width: "150px" }}
        onChange={(value: string) => setValue(value)}
        options={data}
      />
    </div>
  );
};

export default SelectForm;
