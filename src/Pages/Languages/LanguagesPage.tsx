import { FC } from "react";
import TableLanguages from "../../components/Tables/TableLanguages";

const LanguagesPage: FC = () => {
  return (
    <>
      <div className="flex items-center">
        <h1>ЯЗЫКИ</h1>
      </div>
      <div className="mt-6"></div>
      <div></div>
      <TableLanguages />
    </>
  );
};

export default LanguagesPage;
