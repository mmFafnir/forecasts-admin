export type TypeBookmaker = {
  code: string;
  created_at: Date;
  id: number;
  logo?: string;
  name: string;
  price: string;
  updated_at: Date;
  url: string;
};

export interface IDataCreateBookmaker {
  name: string;
  price: number;
  code: string;
  url: string;
}

export interface IDataUpdateBookmaker extends IDataCreateBookmaker {
  bookmaker_id: number;
}
