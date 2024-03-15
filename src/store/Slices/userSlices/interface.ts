export type TypeUser = {
  avatar: string;
  balance: string;
  created_at: Date;
  date_of_birth: string;
  email: string;
  email_verify_code: string;
  gender: "M" | "F";
  id: number | string;
  name: string;
  nickname: string;
  role_id: string;
  premium: "0" | "1";
  surname: string;
  updated_at: Date;
};

export interface IFetchDataUsers {
  current_page: number;
  data: TypeUser[];
  from: 1;
  links: [];
  last_page: 1;
  to: 3;
  total: 3;
}

export interface ICreateUser {
  email: string;
  name: string;
  password: string;
  role_id: number;
}

export type TypeRole = {
  id: number;
  name: string;
};
