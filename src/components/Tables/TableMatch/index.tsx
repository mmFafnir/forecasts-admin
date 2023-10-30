import { Table as TableAnt } from "antd";
import { FC, useState, Key } from "react";
import data from "./data";
import { columns } from "./colums";

export interface DataType {
  key: React.Key;
  id: string;
  country: string;
  league: string;
  season: string;
  date: string;
  time: string;
  team_home: string;
  team_away: string;
  update: string;
  user: string;
}

const TableMatch: FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  //   const [loading, setLoading] = useState<boolean>(false);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="flex flex-col pr-11" style={{ maxWidth: "1400px" }}>
      <div className="mb-5">
        <span className="mr-2">
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <TableAnt
        className="table"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
};

export default TableMatch;
