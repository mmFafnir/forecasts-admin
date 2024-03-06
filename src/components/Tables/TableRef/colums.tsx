import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TypeRef } from "../../../store/Slices/refsSlice/interface";

export const columns: ColumnsType<TypeRef> = [
  {
    title: "Код",
    dataIndex: "ref_code",
  },
  {
    title: "Срок действия",
    dataIndex: "work_count",
  },
  {
    title: "Пользователи(Id)",
    dataIndex: "ref_code",
    render: (_, record) => <p>{record.user_id || "Нет"}</p>,
  },
  {
    title: "Бонусные дни",
    dataIndex: "bonus_day",
    render: (_, record) => (
      <p>
        {record.bonus_day ? (
          <span style={{ color: "#20b418" }}>Есть</span>
        ) : (
          <span style={{ color: "#c21717" }}>Нет</span>
        )}
      </p>
    ),
  },

  {
    title: "Скидка",
    dataIndex: "bonus_percent",
    render: (_, record) => (
      <p>
        {record.bonus_percent ? (
          <span style={{ color: "#20b418" }}>Есть</span>
        ) : (
          <span style={{ color: "#c21717" }}>Нет</span>
        )}
      </p>
    ),
  },

  {
    title: "Создано",
    dataIndex: "created_at",
    render: (_, record) => (
      <p>{dayjs(record.created_at).format("DD-MM-YYYY")}</p>
    ),
  },
  {
    title: "Обновлено",
    dataIndex: "updated_at",
    render: (_, record) => (
      <p>{dayjs(record.updated_at).format("DD-MM-YYYY")}</p>
    ),
  },

  {
    title: "",
    key: "action",
  },
];
