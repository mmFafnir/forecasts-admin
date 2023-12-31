import { FC, UIEvent } from "react";
import { AutoComplete, Empty, Spin } from "antd";
import { getScrollPos } from "../../../assets/scripts/getScrollPos";

export interface ISelectDataAutoComplete {
  key: string;
  value: string;
}

interface IProps {
  data: ISelectDataAutoComplete[];
  setLimit: () => void;
  setSearch: (value: string, id?: number | string) => void;
  placeholder?: string;
  loading?: boolean;
  empty?: boolean;
}

type TypeOptions = {
  value: string;
  key: number | string;
};

let timerId: NodeJS.Timeout | undefined = undefined;

const CustomAutoComplete: FC<IProps> = ({
  data,
  setSearch,
  loading = false,
  empty = false,
  setLimit,
  placeholder = "Поиск...",
}) => {
  const onScroll = (e: UIEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const scrollDiv = target.parentElement?.querySelector(
      ".rc-virtual-list-scrollbar-vertical"
    );
    if (!scrollDiv) return;
    if (getScrollPos(scrollDiv.children[0] as HTMLElement).bottom == 0) {
      if (loading || empty) return;
      setLimit();
    }
  };
  const onSearch = (value: string, options?: TypeOptions) => {
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      setSearch(value, options?.key);
    }, 400);
  };

  return (
    <Spin spinning={loading}>
      <AutoComplete
        rootClassName="text-left"
        style={{ minWidth: 200 }}
        options={data}
        placeholder={placeholder}
        onChange={(value, options) => onSearch(value, options as TypeOptions)}
        onPopupScroll={(e) => onScroll(e)}
        notFoundContent={<Empty description="Пусто" />}
      />
    </Spin>
  );
};

export default CustomAutoComplete;
