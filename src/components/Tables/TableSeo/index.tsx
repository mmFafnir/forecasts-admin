import { Spin } from "antd";
import { FC } from "react";
import Table from "..";
import { columns } from "./columns";
import { ISeo } from "../../../store/Slices/seoSlice/interface";

interface IProps {
  data: ISeo[];
  loading?: boolean;
}
const TableSeo: FC<IProps> = ({ data, loading = false }) => {
  return (
    <div>
      <Spin size="large" spinning={loading} tip="Loading...">
        <Table data={data} columns={columns} />
      </Spin>
      {/* <Pagination setPage={setPage} defaultPage={page} total={total} /> */}
    </div>
  );
};

export default TableSeo;
