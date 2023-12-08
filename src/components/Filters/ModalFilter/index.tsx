import { FC } from "react";
import Countries from "./Countries";
import { EnumModalFilters } from "../../../types/Enums";
import Leagues from "./Leagues";
import Date from "./Date";
import ChatGptText from "./ChatGptStatus";

interface IProps {
  name: EnumModalFilters;
}

const getCurrentFilter = (name: string) => {
  switch (name) {
    case EnumModalFilters.COUNTRIES:
      return <Countries />;
    case EnumModalFilters.LEAGUES:
      return <Leagues />;
    case EnumModalFilters.DATE:
      return <Date />;
    case EnumModalFilters.STATUS_CHAT_GPT_TEXT:
      return <ChatGptText />;
    default:
      return <p>Фильтр в разработке</p>;
  }
};

const ModalFilter: FC<IProps> = ({ name }) => {
  console.log(name);
  return (
    <div className="ml-2">
      <div className="relative">{getCurrentFilter(name)}</div>
    </div>
  );
};

export default ModalFilter;
