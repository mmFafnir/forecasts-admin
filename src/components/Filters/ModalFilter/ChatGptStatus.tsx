import { Select } from "antd";
import { FC } from "react";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { setChatGptTextStatus } from "../../../store/Slices/filterSlice";
import { TypeChatGptTextStatus } from "../../../types/TypeFilter";

const items = [
  { label: "Все", value: "" },
  { label: "Текст не отправлен", value: "0" },
  { label: "На модерации", value: "1" },
  { label: "Пришел ответ", value: "2" },
  // { label: "Ожидаем события", value: "3" },
  { label: "Уже на сайте", value: "4" },
];

const ChatGptText: FC = () => {
  const { chat_gpt_text_status } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();
  const onChange = (value: TypeChatGptTextStatus) => {
    console.log(value);
    dispatch(setChatGptTextStatus(value));
  };

  return (
    <>
      <p className="mr-2 font-semibold absolute -top-4">
        Сортировка по статусу:
      </p>
      <Select
        style={{ width: 180 }}
        value={chat_gpt_text_status}
        onChange={onChange}
        options={items}
        className="text-left"
      />
    </>
  );
};

export default ChatGptText;
