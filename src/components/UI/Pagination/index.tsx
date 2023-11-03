import { FC } from "react";
import { Pagination as PaginationAnt } from "antd";

interface IProps {
  defaultPage?: number;
  total: number;
  setPage: (page: number) => void;
}
const Pagination: FC<IProps> = ({ defaultPage = 1, total = 1, setPage }) => {
  if (total === 1) return <></>;
  return (
    <div className="mt-4">
      <PaginationAnt
        onChange={setPage}
        current={defaultPage}
        total={total}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Pagination;
