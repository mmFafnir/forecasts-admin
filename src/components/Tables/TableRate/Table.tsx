import { Table as AntTable } from "antd";
import { FC, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import Search from "antd/es/input/Search";
import { TypeRate } from "../../../store/Slices/rateSlice/interface";

interface IProps {
  columns: ColumnsType<TypeRate>;
  data: TypeRate[];
}

const Table: FC<IProps> = ({ columns, data }) => {
  const [currentData, setCurrentData] = useState<TypeRate[]>([]);
  const handleSearch = (value: string) => {
    setCurrentData([...data.filter((item) => `${item.name}`.includes(value))]);
  };

  useEffect(() => {
    setCurrentData(data);
  }, [data]);
  return (
    <div className="pr-11">
      <Search className="max-w-sm ml-auto block mb-3" onSearch={handleSearch} />
      <AntTable
        className="table w-full"
        rowKey="id"
        columns={columns}
        dataSource={currentData}
      />
    </div>
  );
};

export default Table;
