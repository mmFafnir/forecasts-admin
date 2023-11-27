import { useEffect, useState } from "react";
import { useTypeSelector } from "./useTypeSelector";

type TData = {
  label: string;
  value: string;
};

const useEventDataHook = () => {
  const { events } = useTypeSelector((state) => state.events);
  const [data, setData] = useState<TData[]>([]);

  useEffect(() => {
    const items: TData[] = [];
    events.forEach((event) => {
      items.push({
        value: String(event.id),
        label: event.show_name || event.original_name,
      });
    });
    setData(items);
  }, [events]);

  return data;
};

export default useEventDataHook;
