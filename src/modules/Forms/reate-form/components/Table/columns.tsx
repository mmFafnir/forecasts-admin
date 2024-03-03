import { ColumnsType } from "antd/es/table";

import dayjs from "dayjs";
import { TypeRateDetail } from "../../../../../store/Slices/rateSlice/interface";

export const columns: ColumnsType<TypeRateDetail> = [
  {
    title: "Название",
    dataIndex: "name",
  },

  {
    title: "Цена",
    dataIndex: "price_rub",
    key: "price",
    onFilter: (value, record) => {
      console.log(value, record);
      return true;
    },

    render: (_, record) => {
      return <p>{record.price_rub}</p>;
    },
  },

  {
    key: "work",
    dataIndex: "work_day",
    title: "Переод",
    render: () => {
      return <p></p>;
    },
  },

  {
    title: "Дата обновления",
    dataIndex: "updated_at",
    render: (_, record) => {
      return (
        <p className="text-left">
          {record.updated_at
            ? `${dayjs(record.updated_at).format("DD.MM.YYYY")}`
            : "null"}
        </p>
      );
    },
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
