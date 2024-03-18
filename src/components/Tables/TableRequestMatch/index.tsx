import { Radio, Spin } from "antd";
import { columns } from "./columns";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { IMatchRequest } from "../../../types/match";
import { useEffect, useState } from "react";
import { getRequestMatch } from "../../../api/match/getRequestMatch";
import Table from "..";
import Pagination from "../../UI/Pagination";

const TableRequestMatch = () => {
  const { limit, search } = useTypeSelector((state) => state.filters);

  const [data, setData] = useState<IMatchRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [mode, setMode] = useState<"new" | "old">("new");

  const fetchDataRequest = (page: number) => {
    setLoading(true);
    getRequestMatch({
      page: page,
      search,
      limit,
      type: mode,
    })
      .then((res) => {
        setTotal(res.total);
        setData(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setPage(1);
    fetchDataRequest(1);
  }, [limit, search, mode]);

  console.log(data);
  return (
    <div>
      <div>
        <Radio.Group
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className="block  text-left"
          style={{ marginBottom: 8 }}
        >
          <Radio.Button type="" value="new">
            Новые
          </Radio.Button>
          <Radio.Button value="old">Старые</Radio.Button>
        </Radio.Group>
      </div>
      <Spin size="large" spinning={loading} tip="Loading...">
        <Table data={data} columns={columns} />
        <Pagination
          callback={(page) => fetchDataRequest(page)}
          defaultPage={page}
          total={total}
        />
      </Spin>
    </div>
  );
};

export default TableRequestMatch;
