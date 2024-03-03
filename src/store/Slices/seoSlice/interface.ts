import { TypeCountry } from "../countriesSlice/interface";
import { TypeLeague } from "../leaguesSlice/interface";
import { TypeSport } from "../sportSlice/interface";

interface IDopSet {
  id: number;
  country_id: number;
  league_id: number;
  league?: TypeLeague;
  sport: TypeSport;
  country?: TypeCountry;
  sport_id: number;
}

export interface ISeo {
  id: number;
  ceo_title: string;
  ceo_description: string;
  ceo_keywords: string;
  ceo_h: string;
  ceo_short_description_for_h: string;
  ceo_photo: string;
  ceo_text: string;
  page: null | string;
  created_at: string;
  updated_at: string;
  sports_idi: number;
  country?: IDopSet[];
  sport?: IDopSet[];
  league?: IDopSet[];
}

export interface IFaqSeo {
  id: number;
  ru_faq: null | string;
  ru_replay: null | string;
  order_by: null | string;
  created_at: null | string;
  updated_at: null | string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_h: string;
  seo_short_description_for_h: string;
}

export interface IUpdateSeo {
  ceo_title: string;
  ceo_description: string;
  ceo_keywords: string;
  ceo_h: string;
  ceo_short_description_for_h: string;
  ceo_text: string;
}

export interface IUpdateSeoFaq {
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_h: string;
  seo_short_description_for_h: string;
}

export interface ICreateSeo {
  ceo_title: string;
  ceo_description: string;
  ceo_keywords: string;
  ceo_h: string;
  ceo_short_description_for_h: string;
  ceo_text: string;
  ceo_photo: string;
  sports_id: string;
  countrys_id: string;
  leagues_id: string;
}

export interface ICreateGeneralSeo {
  [key: string]: IUpdateSeo;
}
