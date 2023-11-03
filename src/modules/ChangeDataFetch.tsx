import { ReactElement } from "react";
import { ITeam } from "../store/Slices/teamsSlice/interface";

export interface TypeTableTeam extends ITeam {
  img: ReactElement<HTMLImageElement>;
}
export const changeDataTeams = (teams: ITeam[]): TypeTableTeam[] => {
  const tableTeams: TypeTableTeam[] = teams.map((team) => {
    return {
      ...team,
      img: (
        <img
          src={
            team.get_photo == "1"
              ? "https://metallprofil-vrn.ru/local/templates/aspro-stroy/images/noimage_detail.png"
              : `https://admin.aibetguru.com/uploads/${team.get_photo}.png`
          }
        ></img>
      ),
    };
  });
  console.log(tableTeams);
  return tableTeams;
};
