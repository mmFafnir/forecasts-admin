import { Table as TableAnt } from "antd";
import { AnyObject } from "antd/es/_util/type";
// import { ColumnsType } from "antd/es/table";
import { FC, useState, Key } from "react";

type TData = AnyObject;

interface IProps {
  data: TData[];
  columns: TData[];
}
const Table: FC<IProps> = ({ data, columns }) => {
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

export default Table;
