import { Empty, Table as TableAnt } from "antd";
import { AnyObject } from "antd/es/_util/type";
// import { ColumnsType } from "antd/es/table";
import { FC, useState, Key } from "react";
import Search from "../UI/Search";

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
    <div className="flex flex-col pr-11 ">
      <div className="mb-5">
        <span className="mr-2">
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Search />
      <TableAnt
        className="table"
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      {data.length === 0 && (
        <Empty
          style={{ minHeight: "500px", paddingTop: "10%" }}
          description={"Пусто :("}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </div>
  );
};

export default Table;
