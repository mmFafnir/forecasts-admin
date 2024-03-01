import { ITranslateLeague } from "../leaguesSlice/interface";

export type TypeCountry = {
  id: string;
  code: string;
  name: string;
  translation: string;
  translate: ITranslateLeague[];
  league?: [];
};

export interface IDataTypeCountryFetch {
  current_page: number;
  data: TypeCountry[];
  last_page: number;
  total: number;
}

export interface ICreateCountry {
  name: string;
  translation: string;
  photo: string;
}
