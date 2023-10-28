import { ColumnsType } from "antd/es/table";
import { DataType } from ".";

export const columns: ColumnsType<DataType> = [
  {
    title: "Страна",
    dataIndex: "country",
  },
  {
    title: "Лига",
    dataIndex: "league",
  },
  {
    title: "Сезон",
    dataIndex: "season",
  },
  {
    title: "Дата",
    dataIndex: "date",
  },
  {
    title: "Время",
    dataIndex: "time",
  },
  {
    title: "Команда дома",
    dataIndex: "team_home",
  },
  {
    title: "Команда в гостях",
    dataIndex: "team_away",
  },
  {
    title: "Дата обновления",
    dataIndex: "update",
  },
  {
    title: "Пользователь",
    dataIndex: "user",
  },
  {
    title: "",
    key: "action",
    render: () => (
      <div>
        <a>d</a>
      </div>
    ),
  },
];
