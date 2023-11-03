import { FC } from "react";
import { Switch as SwitchAnt } from "antd";

export type TSwitchItem = {
  name: string;
  title?: string;
};

interface IProps {
  items: [TSwitchItem, TSwitchItem];
  setItem: (name: string) => void;
}
const Switch: FC<IProps> = ({ items, setItem }) => {
  const onChange = (checked: boolean) => {
    if (checked) return setItem(items[0].name);
    return setItem(items[1].name);
  };

  return (
    <div className="flex items-center">
      <p>{items[0].title}</p>
      <SwitchAnt className="mx-3 bg-slate-300" onChange={onChange} />
      <p>{items[1].title}</p>
    </div>
  );
};

export default Switch;
