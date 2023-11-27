import { useEffect, useState } from "react";
import { useTypeSelector } from "./useTypeSelector";

type TData = {
  label: string;
  value: string;
};

const useRiskDataHook = () => {
  const { risks } = useTypeSelector((state) => state.risks);
  const [data, setData] = useState<TData[]>([]);

  useEffect(() => {
    const items: TData[] = [];
    risks.forEach((risk) => {
      items.push({
        value: String(risk.id),
        label: risk.name,
      });
    });
    setData(items);
  }, [risks]);

  return data;
};

export default useRiskDataHook;
