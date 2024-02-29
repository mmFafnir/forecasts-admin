import { Form, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { ITranslateLeague } from "../../../store/Slices/leaguesSlice/interface";

export const columns: ColumnsType<ITranslateLeague> = [
  {
    title: "Язык",
    dataIndex: "lang_id",
    render: (_, record) => (
      <p>
        {record.lang.name}/{record.lang.url}
      </p>
    ),
  },
  {
    title: "Перевод",
    dataIndex: "translation",
    render: (_, record) => (
      <Form.Item
        className="!mb-0"
        name={record.id}
        initialValue={record.translation}
      >
        <Input />
      </Form.Item>
    ),
  },
  {
    title: "",
    key: "action",
  },
];
