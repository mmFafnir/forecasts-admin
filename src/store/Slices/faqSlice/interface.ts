export interface IFaq {
  id: number;
  ru_faq: string;
  ru_replay: string;
  order_by: string;
  updated_at: string;
  created_at: string;
  seo_description: string | null;
  seo_title: string | null;
  seo_keywords: string | null;
  seo_h: string | null;
  seo_short_description_for_h: string | null;
}

export interface IPostFaq {
  ru_faq: string;
  ru_replay: string;
  en_faq?: string;
  en_replay?: string;
  order_by: number;
}
