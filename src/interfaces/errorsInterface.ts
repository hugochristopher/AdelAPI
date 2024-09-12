import { IListProduct } from "./listProductsInterface";
import { INews } from "./newsInterface";
import { IUsers } from "./usersInterface";

export interface IResponseObj {
  code: number;
  message?: string | IUsers[] | IUsers | IListProduct[] | ISectionObj[] | any[];
  token?: string;
}

export interface ISectionObj {
  id: number;
  sectionName: string;
}