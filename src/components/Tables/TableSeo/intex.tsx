import { Spin } from "antd";
import { FC, useEffect } from "react";
import Table from "..";
import { columns } from "./columns";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { EnumStatus } from "../../../types/Status";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { fetchAllSeo } from "../../../store/Slices/seoSlice/asyncActions";

const TableSeo: FC = () => {
  const dispatch = useTypeDispatch();
  const { seo, status } = useTypeSelector((state) => state.seo);
  useEffect(() => {
    dispatch(fetchAllSeo());
  }, []);

  return (
    <div>
      <Spin
        size="large"
        spinning={status == EnumStatus.LOADING}
        tip="Loading..."
      >
        <Table data={seo} columns={columns} />
      </Spin>
      {/* <Pagination setPage={setPage} defaultPage={page} total={total} /> */}
    </div>
  );
};

export default TableSeo;
