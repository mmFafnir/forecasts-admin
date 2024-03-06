export type TypeRef = {
  id: number;
  user_id: null | string;
  ref_code: string;
  created_at: string;
  updated_at: string;
  type_id: null | string;
  work_count: string;
  bonus_day: string;
  bonus_percent: string;
  free_tariffe: string;
};

export interface IFetchRef {
  current_page: number;
  data: TypeRef[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface ICreateRef {
  code: string;
  work_count: number;
  bonus_day: 0 | 1;
  bonus_percent: 0 | 1;
  free_tariffe: 0 | 1;
}

export interface IUpdateRef extends ICreateRef {
  ref_id: number;
}
