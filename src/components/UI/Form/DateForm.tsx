import { DatePicker, DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { FC, useEffect, useState } from "react";

interface IProps {
  defaultDate?: string;
  label?: string;
  setDate: (value: string) => void;
}

const dateFormat = "DD-MM-YYYY";

const DateForm: FC<IProps> = ({ defaultDate, setDate, label }) => {
  const [value, setValue] = useState<Dayjs | null>(
    defaultDate ? dayjs(defaultDate) : null
  );

  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString);
    if (dateString.length === 0) return setValue(null);
    setValue(dayjs(dateString, dateFormat));
  };

  useEffect(() => {
    setDate(defaultDate ? defaultDate : "");
  }, []);

  return (
    <div className="w-32">
      {label && <p className="text-left mb-2">{label}</p>}
      <DatePicker
        className="block"
        value={value}
        format={dateFormat}
        onChange={onChange}
      />
    </div>
  );
};

export default DateForm;
