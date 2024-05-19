export interface IProduct {
  sequence: number;
  measure: string;
  productName: string;
  quantity: number;
  checked: boolean;
}

export interface IList {
  listName: string;
  total: number;
  createdAt: Date;
  products: IProduct[];
}

export interface IListProduct {
  userId: string;
  uuidv: string;
  lists: IList[];
  createdAt: Date;
  updatedAt: Date;
}