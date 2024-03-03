export type TypeRate = {
  id: number;
  name: string;
  order_by: null | string;
  status: null | string;
  created_at: string;
  updated_at: string;
};

export type TypeRateDetail = {
  id: number;
  rate_id: number;
  free_or_not: "1" | "0";
  name: string;
  price_rub: string;
  price_usd: string;
  price_euro: string;
  work_day: null | string;
  work_month: null | string;
  work_year: null | string;
  order_by: null | string;
  created_at: string;
  updated_at: string;
  day_price_rub: null | string;
  day_price_usd: null | string;
  day_price_euro: null | string;
  saved_price_rub: null | string;
  saved_price_usd: null | string;
  saved_price_euro: null | string;
  bonus_day: null | string;
  bonus_percent: null | string;
};

export interface IRateFetchSingle extends TypeRate {
  rate_detail: TypeRateDetail[];
}

export interface ICreateDetailsRate {
  name: string;
  free_or_not: 0 | 1;
  rate_id: number;

  price_rub: string;
  price_usd: string;
  price_euro: string;

  work_day: string;
  work_month: string;
  work_year: string;

  saved_price_rub: string;
  saved_price_usd: string;
  saved_price_euro: string;

  day_price_rub: string;
  day_price_usd: string;
  day_price_euro: string;

  bonus_day: string;
  bonus_percent: string;
}

export interface IUpdateDetailsRate
  extends Omit<ICreateDetailsRate, "rate_id"> {
  rate_detail_id: number;
}
