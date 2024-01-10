import { Spin } from "antd";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { FC, useEffect, useState } from "react";
import { EnumStatus } from "../../../types/Status";
import { columns } from "./colums";
import Pagination from "../../UI/Pagination";
import Table from "..";
import { getAllUsers } from "../../../store/Slices/userSlices/asyncAction";

const TableUsers: FC = () => {
  const { users, status, total } = useTypeSelector((state) => state.user);
  const { search } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getAllUsers({ search }));
  }, [search]);

  return (
    <div>
      <Spin
        size="large"
        spinning={status == EnumStatus.LOADING}
        tip="Loading..."
      >
        <Table data={users} columns={columns} />
      </Spin>
      <Pagination setPage={setPage} defaultPage={page} total={total} />
    </div>
  );
};

export default TableUsers;
