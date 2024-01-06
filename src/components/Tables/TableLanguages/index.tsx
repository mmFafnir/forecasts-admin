import { FC, useEffect } from "react";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { Spin } from "antd";
import { EnumStatus } from "../../../types/Status";
import { columns } from "./columnt";
import Table from "..";
import { fetchLanguages } from "../../../store/Slices/languagesSlice/actions";

const TableLanguages: FC = () => {
  const { status, languages } = useTypeSelector((state) => state.languages);
  const dispatch = useTypeDispatch();

  useEffect(() => {
    dispatch(fetchLanguages());
  }, []);

  return (
    <div>
      <Spin
        size="large"
        spinning={status == EnumStatus.LOADING}
        tip="Loading..."
      >
        <Table data={languages} columns={columns} />
      </Spin>
    </div>
  );
};

export default TableLanguages;
