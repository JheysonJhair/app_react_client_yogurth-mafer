export interface Product {
  IdProduct?: number;
  Name: string;
  Description: string;
  NutritionalInformation: string;
  Price: number;
  UrlImage?: string;
  Visible: boolean;
  Stock?: number;
  Featured:boolean;
  amount?: number;
}
