export type TypeCountry = {
  code: string;
  name: string;
  translation: string;
};

export interface IDataTypeCountryFetch {
  current_page: number;
  data: TypeCountry[];
  last_page: number;
}
