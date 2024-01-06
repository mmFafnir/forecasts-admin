export type TypeLanguages = {
  created_at: null | string;
  id: number;
  lang_json: string;
  name: string;
  updated_at: null | string;
  url: string;
};

export interface IUpdateLanguages {
  lang_json: string;
  name: string;
  url: string;
}
