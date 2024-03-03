import { Table as AntTable } from "antd";
import { FC, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import Search from "antd/es/input/Search";
import { ISeo } from "../../../store/Slices/seoSlice/interface";

interface IProps {
  columns: ColumnsType<ISeo>;
  data: ISeo[];
}

const Table: FC<IProps> = ({ columns, data }) => {
  const [currentData, setCurrentData] = useState<ISeo[]>([]);
  const handleSearch = (value: string) => {
    setCurrentData([
      ...data.filter((item) =>
        `${item.ceo_title} ${item.league
          ?.map((lig) => lig.league?.league_name)
          .join(" ")} ${item.country
          ?.map((ctr) => `${ctr.country?.name}  ${ctr.country?.translation}`)
          .join("")}`.includes(value)
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
        rowKey="id"
        columns={columns}
        dataSource={currentData}
      />
    </div>
  );
};

export default Table;
