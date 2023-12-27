import { FC } from "react";
import { Pagination as PaginationAnt } from "antd";
import { useTypeSelector } from "../../../hooks/useTypeSelector";

interface IProps {
  defaultPage?: number;
  total: number;
  setPage: (page: number) => void;
}
const Pagination: FC<IProps> = ({ defaultPage = 1, total = 1, setPage }) => {
  const { limit } = useTypeSelector((state) => state.filters);

  if (Math.floor(total / Number(limit)) === 1) return <></>;
  return (
    <div className="mt-4">
      <PaginationAnt
        onChange={setPage}
        current={defaultPage}
        total={total}
        pageSize={Number(limit)}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Pagination;
