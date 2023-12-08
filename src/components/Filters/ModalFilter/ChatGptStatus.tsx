import { Radio, RadioChangeEvent } from "antd";
import { FC } from "react";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { setChatGptTextStatus } from "../../../store/Slices/filterSlice";

const items = [
  { label: "Все", value: "" },
  { label: "Текст не отправлен", value: "0" },
  { label: "Ждем ответ", value: "1" },
  { label: "Пришел ответ", value: "2" },
  { label: "Ожидаем события", value: "3" },
  { label: "Cобытия пришли", value: "4" },
];

const ChatGptText: FC = () => {
  const { chat_gpt_text_status } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(setChatGptTextStatus(value));
  };

  return (
    <>
      <p className="mr-2 font-semibold absolute -top-4">
        Сортировка по статусу:
      </p>
      <Radio.Group
        options={items}
        onChange={onChange}
        value={chat_gpt_text_status}
        optionType="button"
        buttonStyle="solid"
      />
    </>
  );
};

export default ChatGptText;
