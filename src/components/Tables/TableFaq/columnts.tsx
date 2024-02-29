import { ColumnsType } from "antd/es/table";

import dayjs from "dayjs";
import { IFaq } from "../../../store/Slices/faqSlice/interface";

export const columns: ColumnsType<IFaq> = [
  {
    title: "Вопрос",
    dataIndex: "ru_faq",
  },

  {
    title: "Дата обновления",
    dataIndex: "updated_at",
    render: (_, record) => (
      <p className="text-left">
        {record.updated_at
          ? `${dayjs(record.updated_at).format("DD.MM.YYYY")}`
          : "null"}
      </p>
    ),
  },

  {
    title: "Дата",
    dataIndex: "created_at",
    render: (_, record) => (
      <p className="text-left">
        {record.created_at
          ? `${dayjs(record.created_at).format("DD.MM.YYYY")}`
          : "null"}
      </p>
    ),
  },

  {
    title: "",
    key: "action",
  },
];
