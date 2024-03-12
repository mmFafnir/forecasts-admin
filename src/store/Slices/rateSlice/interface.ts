export interface IWallet {
  eu: number;
  usd: number;
}

export type TypeRate = {
  id: number;
  name: string;
  order_by: null | string;
  status: null | string;
  created_at: string;
  updated_at: string;
  bonus: string;
  show_status: "1" | "0";
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

  price_rub_with_bonus: string;
  price_usd_with_bonus: string;
  price_euro_with_bonus: string;
  show_status: 0 | 1;
  has_top: 0 | 1;
  start_tariffe: 0 | 1;
};

export interface IRateFetchSingle extends TypeRate {
  rate_detail: TypeRateDetail[];
}

export interface IUpdateRate {
  rate_id: number;
  show_status: string;
  bonus: string;
}

export interface ICreateDetailsRate {
  name: string;
  free_or_not: 0 | 1;
  show_status: 0 | 1;

  start_tariffe: 0 | 1;
  has_top: 0 | 1;

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

  price_rub_with_bonus: string;
  price_usd_with_bonus: string;
  price_euro_with_bonus: string;

  day_price_rub: string;
  day_price_usd: string;
  day_price_euro: string;

  bonus_day: string;
  bonus_percent: string;
}

export interface IUpdateDetailsRate
  extends Omit<ICreateDetailsRate, "rate_id"> {
  rate_detail_id: number;
  rate_id: string | number;
}
