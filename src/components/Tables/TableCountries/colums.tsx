import { ColumnsType } from "antd/es/table";
import { Image, Spin } from "antd";
import { TypeCountry } from "../../../store/Slices/countriesSlice/interface";

export const columns: ColumnsType<TypeCountry> = [
  {
    title: "Страна",
    dataIndex: "name",
    render: (_, record) => (
      <>
        <p>{record.translation}</p>
        <p>({record.name})</p>
      </>
    ),
  },
  {
    title: "Лого",
    dataIndex: "code",
    render: (_, record) => (
      <Image
        width={20}
        src={`https://admin.aibetguru.com/uploads/${record.code}.svg`}
        placeholder={<Spin />}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://cdn-icons-png.flaticon.com/512/921/921490.png";
        }}
      />
    ),
  },

  {
    title: "Переводы",
    key: "translate",
    width: 200,
  },
];
