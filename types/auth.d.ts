import { NextApiRequest } from "next";

export interface ISignInData {
  email: string;
  password: string;
}

export interface IFormData extends ISignInData {
  name: string;
  phone: string;
  address: string;
  dob: string;
  password?: string;
  mother_id?: number;
  father_id?: number;
}

export interface IForm {
  type: "sign up" | "edit" | "add";
  id?: number;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  mother: IUser;
  father: IUser;
  mother_id: number;
  father_id: number;
}

export interface CustomRequest extends NextApiRequest {
  userId?: number;
}
