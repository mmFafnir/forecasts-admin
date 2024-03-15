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
        label:
          risk.translate && risk.translate.length > 0
            ? risk.translate[0].translation
            : risk.name,
      });
    });
    setData(items);
  }, [risks]);

  return data;
};

export default useRiskDataHook;
