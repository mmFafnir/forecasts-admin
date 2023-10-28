import { Table as TableAnt } from "antd";
import { FC, useState, Key } from "react";
import data from "./data";
import { columns } from "./colums";

export interface DataType {
  key: React.Key;
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
    <div style={{ maxWidth: "1700px" }}>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <TableAnt
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
};

export default TableMatch;
