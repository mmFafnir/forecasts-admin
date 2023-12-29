import { FC } from "react";
import Countries from "./Countries";
import { EnumModalFilters } from "../../../types/Enums";
import Leagues from "./Leagues";
import Date from "./Date";
import ChatGptText from "./ChatGptStatus";
import Favorite from "./Favorite";

interface IProps {
  name: EnumModalFilters;
}

const components = [
  {
    name: EnumModalFilters.COUNTRIES,
    component: <Countries />,
  },
  {
    name: EnumModalFilters.LEAGUES,
    component: <Leagues />,
  },
  {
    name: EnumModalFilters.DATE,
    component: <Date />,
  },
  {
    name: EnumModalFilters.STATUS_CHAT_GPT_TEXT,
    component: <ChatGptText />,
  },
  {
    name: EnumModalFilters.FAVORITE,
    component: <Favorite />,
  },
];
const ModalFilter: FC<IProps> = ({ name }) => {
  return (
    <div className="ml-2">
      <div className="relative">
        {components.map((item) => (
          <div
            key={item.name}
            className={`${name === item.name ? "block" : "hidden"}`}
          >
            {item.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalFilter;
