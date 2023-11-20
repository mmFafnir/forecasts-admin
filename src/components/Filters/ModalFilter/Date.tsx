import { FC } from "react";
import { DatePicker } from "antd";
import { setDate } from "../../../store/Slices/filterSlice";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";

const { RangePicker } = DatePicker;

const Date: FC = () => {
  const dispatch = useTypeDispatch();
  const onChange = (formatString: [string, string]) => {
    dispatch(
      setDate({
        start: formatString[0],
        finish: formatString[1],
      })
    );
  };

  return (
    <>
      <p className="mr-2 font-semibold absolute -top-4">Посик по датам:</p>
      <RangePicker onChange={(_, formatString) => onChange(formatString)} />
    </>
  );
};

export default Date;
