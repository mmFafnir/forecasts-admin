import { FC } from "react";
import { Pagination as PaginationAnt } from "antd";
import { useTypeSelector } from "../../../hooks/useTypeSelector";

interface IProps {
  defaultPage?: number;
  total: number;
  callback: (page: number) => void;
}
const Pagination: FC<IProps> = ({ defaultPage = 1, total = 1, callback }) => {
  const { limit } = useTypeSelector((state) => state.filters);
  if (Math.ceil(total / Number(limit)) <= 1) return <></>;
  return (
    <div className="mt-4">
      <PaginationAnt
        onChange={callback}
        current={defaultPage}
        total={total}
        pageSize={Number(limit)}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Pagination;
