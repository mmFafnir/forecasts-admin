import { FC, useEffect, useState } from "react";
import {
  IRateFetchSingle,
  TypeRateDetail,
} from "../../../../store/Slices/rateSlice/interface";
import { Table } from "../components/Table";
import { useTypeSelector } from "../../../../hooks/useTypeSelector";
import { useTypeDispatch } from "../../../../hooks/useTypeDispatch";
import { clearDetailRate } from "../../../../store/Slices/rateSlice";

interface IProps {
  data: IRateFetchSingle | null;
}
export const UpdateRate: FC<IProps> = ({ data }) => {
  const { detailRate, typeDetailRate, deleteRate } = useTypeSelector(
    (state) => state.rate
  );
  const dispatch = useTypeDispatch();
  const [details, setDetails] = useState<TypeRateDetail[]>(
    data?.rate_detail || []
  );

  useEffect(() => {
    if (!detailRate) return;
    if (typeDetailRate === "create") {
      setDetails((prev) => [detailRate, ...prev]);
    }
    if (typeDetailRate === "update") {
      console.log("update");
      setDetails((prev) =>
        prev.map((det) => {
          if (det.id === detailRate.id) return detailRate;
          return det;
        })
      );
    }
    dispatch(clearDetailRate());
  }, [detailRate]);

  useEffect(() => {
    if (!deleteRate) return;

    setDetails((prev) => prev.filter((det) => det.id !== deleteRate));
    dispatch(clearDetailRate());
  }, [deleteRate]);

  return (
    <div>
      <Table data={details} />
    </div>
  );
};
