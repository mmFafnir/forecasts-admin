import { ITranslateLeague } from "../leaguesSlice/interface";

export type TypeCountry = {
  id: string;
  code: string;
  name: string;
  translation: string;
  translate: ITranslateLeague[];
};

export interface IDataTypeCountryFetch {
  current_page: number;
  data: TypeCountry[];
  last_page: number;
  total: number;
}
