import { FilterOutlined } from "@ant-design/icons";
import { Radio, Select } from "antd";
import { FC, useState } from "react";

import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { setLimit } from "../../../store/Slices/filterSlice";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import ModalFilter from "../ModalFilter";
import { EnumModalFilters } from "../../../types/Enums";
import "./filterBtn.scss";

type TBtnFilter = {
  value: EnumModalFilters;
  name: string;
};

interface IProps {
  items: TBtnFilter[];
}

const FilterHeader: FC<IProps> = ({ items }) => {
  const { limit } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();

  const [filterName, setFilterName] = useState<EnumModalFilters>(
    items.length > 0 ? items[0].value : EnumModalFilters.COUNTRIES
  );
  const onChangeLimit = (value: string) => dispatch(setLimit(Number(value)));

  return (
    <>
      {items.length > 0 && (
        <div className="flex items-center flex-wrap max relative">
          <FilterOutlined className="filter-btns-svg" />
          <Radio.Group defaultValue={items[0].value} buttonStyle="solid">
            {items.map((item) => (
              <Radio.Button
                key={item.value}
                value={item.value}
                onClick={() => setFilterName(item.value)}
              >
                {item.name}
              </Radio.Button>
            ))}
          </Radio.Group>
          <ModalFilter name={filterName} />
        </div>
      )}
      <div className="flex mt-6 items-center ">
        <p className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M1 6.14286H19M6.14286 1V19M2.28571 1H17.7143C18.0553 1 18.3823 1.13546 18.6234 1.37658C18.8645 1.6177 19 1.94472 19 2.28571V17.7143C19 18.0553 18.8645 18.3823 18.6234 18.6234C18.3823 18.8645 18.0553 19 17.7143 19H2.28571C1.94472 19 1.6177 18.8645 1.37658 18.6234C1.13546 18.3823 1 18.0553 1 17.7143V2.28571C1 1.94472 1.13546 1.6177 1.37658 1.37658C1.6177 1.13546 1.94472 1 2.28571 1Z"
              stroke="#000"
            />
          </svg>
        </p>
        <Select
          className="!w-auto"
          defaultValue={String(limit)}
          onChange={onChangeLimit}
          style={{ width: 120 }}
          options={[
            { value: "10", label: "Кол-во строк: 10 " },
            { value: "20", label: "Кол-во строк: 20" },
            { value: "50", label: "Кол-во строк: 50" },
            { value: "100", label: "Кол-во строк: 100" },
          ]}
        />
      </div>
    </>
  );
};

export default FilterHeader;
