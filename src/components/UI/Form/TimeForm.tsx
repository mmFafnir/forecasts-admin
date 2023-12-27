import { DatePickerProps, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { FC, useEffect, useState } from "react";

interface IProps {
  label?: string;
  setTime: (value: string) => void;
  defaultValue?: string;
}

const timeFormat = "h:mm A";

const TimeForm: FC<IProps> = ({ label, defaultValue, setTime }) => {
  const [value, setValue] = useState<Dayjs | null>(
    defaultValue ? dayjs(defaultValue, timeFormat) : null
  );

  const onChangeTime: DatePickerProps["onChange"] = (_, dateString) => {
    setTime(dateString);
    if (dateString.length === 0) return setValue(null);
    setValue(dayjs(dateString, timeFormat));
  };

  useEffect(() => {
    setTime(defaultValue ? defaultValue : "");
  }, []);

  return (
    <div className="w-32 form-date">
      {label && <p className="text-left mb-2">{label}</p>}
      <TimePicker
        className="block"
        value={value}
        format={timeFormat}
        onChange={onChangeTime}
      />
    </div>
  );
};

export default TimeForm;
