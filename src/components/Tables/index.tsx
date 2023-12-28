import { Button, Empty, Table as TableAnt } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC, useState, Key, useEffect } from "react";
import Search from "../UI/Search";
import { ButtonType } from "antd/es/button";

type TData = AnyObject;

type TCallback = {
  fn: (ids: Key[]) => void;
  title: string;
  type?: ButtonType;
  danger?: boolean;
};

interface IProps {
  data: TData[];
  columns: TData[];
  callback?: TCallback;
}
const Table: FC<IProps> = ({ data, columns, callback }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onCallback = async () => {
    if (!callback) return;
    setLoading(true);
    await callback.fn(selectedRowKeys);
    setLoading(false);
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [data]);

  return (
    <div className="flex flex-col pr-11 ">
      <div className="flex justify-end items-center mt-3 mb-3">
        <span className="mr-2">
          {/* {hasSelected && `Selected ${selectedRowKeys.length} items`} */}
          {callback && (
            <Button
              loading={loading}
              disabled={!hasSelected}
              type={callback.type ? callback.type : "primary"}
              onClick={onCallback}
              danger={callback.danger}
            >
              {`${callback.title} ${hasSelected ? selectedRowKeys.length : ""}`}
            </Button>
          )}
        </span>
        <Search classes="!mb-0 max-w-sm flex-1" />
      </div>
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
