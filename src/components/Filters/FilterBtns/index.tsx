import { FilterOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import { FC } from "react";

import "./filterBtn.scss";

type TBtnFilter = {
  value: string;
  name: string;
};

interface IProps {
  items: TBtnFilter[];
}

const FilterBtns: FC<IProps> = ({ items }) => {
  return (
    <div className="flex items-center flex-wrap max">
      <FilterOutlined className="filter-btns-svg" />
      <Radio.Group defaultValue={items[0].value} buttonStyle="solid">
        {items.map((item) => (
          <Radio.Button key={item.value} value={item.value}>
            {item.name}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};

export default FilterBtns;
