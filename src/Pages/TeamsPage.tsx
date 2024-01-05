import { FC, useEffect } from "react";
import TableTeams from "../components/Tables/TableTeams";
// import axios from "axios";

// const asyncGetTranslates = async () => {
//   const {data} = axios.get()
// }

const TeamsPage: FC = () => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="flex items-center">
        <h1>КОМАНДЫ</h1>
      </div>
      <div className="mt-6"></div>
      <div></div>
      <TableTeams />
    </>
  );
};

export default TeamsPage;
