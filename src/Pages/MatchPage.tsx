import { FC } from "react";
import TableMatch from "../components/Tables/TableMatch";
import FilterHeader from "../components/Filters/FilterHeader";
import { EnumModalFilters } from "../types/Enums";
import { Radio, RadioChangeEvent } from "antd";
import { useTypeDispatch } from "../hooks/useTypeDispatch";
import { setStatusMatch } from "../store/Slices/filterSlice";
import { useTypeSelector } from "../hooks/useTypeSelector";

const StatusMatch = [
  { label: "Все", value: "" },
  { label: "Не начался", value: "0" },
  { label: "В игре(Live)", value: "1" },
  { label: "Завершен", value: "3" },
];

const filterBtnItems = [
  {
    name: "Страна",
    value: EnumModalFilters.COUNTRIES,
  },
  {
    name: "Лига",
    value: EnumModalFilters.LEAGUES,
  },
  {
    name: "Дата начала",
    value: EnumModalFilters.DATE,
  },
  {
    name: "Текст чат-GPT",
    value: EnumModalFilters.STATUS_CHAT_GPT_TEXT,
  },
];

const MatchPage: FC = () => {
  const { statusMatch } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(setStatusMatch(value));
    console.log("radio3 checked", value);
  };

  return (
    <>
      <div className="flex items-center ">
        <h1 className="line-after">МАТЧИ</h1>

        <div>
          <Radio.Group
            options={StatusMatch}
            onChange={onChange}
            value={statusMatch}
            optionType="button"
          />
        </div>
        {/* <Switch items={switchItems} setItem={setStatusMatch} /> */}
      </div>
      <div className="mt-6">
        <FilterHeader items={filterBtnItems} />
      </div>
      <div></div>
      <TableMatch />
    </>
  );
};

export default MatchPage;
