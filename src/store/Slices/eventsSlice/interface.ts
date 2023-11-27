export type TypeEvent = {
  created_at: string;
  id: number;
  original_name: string;
  show_name: null | string;
  status: string | number;
  updated_at: string;
};

export interface UpdateEventParams {
  id: number;
  name: string;
}
