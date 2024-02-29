import { Table as AntTable } from "antd";
import { FC, useEffect, useState } from "react";
import { TypeCountry } from "../../../store/Slices/countriesSlice/interface";
import { ColumnsType } from "antd/es/table";
import Search from "antd/es/input/Search";

interface IProps {
  columns: ColumnsType<TypeCountry>;
  data: TypeCountry[];
}

const TableCountry: FC<IProps> = ({ columns, data }) => {
  const [currentData, setCurrentData] = useState<TypeCountry[]>([]);
  const handleSearch = (value: string) => {
    setCurrentData([
      ...data.filter((item) =>
        `${item.name} ${item.translation}`.includes(value)
      ),
    ]);
  };

  useEffect(() => {
    setCurrentData(data);
  }, [data]);
  return (
    <div className="pr-11">
      <Search className="max-w-sm ml-auto block mb-3" onSearch={handleSearch} />
      <AntTable
        className="table w-full"
        rowKey="code"
        columns={columns}
        dataSource={currentData}
      />
    </div>
  );
};

export default TableCountry;
