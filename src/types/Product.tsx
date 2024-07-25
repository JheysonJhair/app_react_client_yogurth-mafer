export interface Product {
  IdProduct: any;
  Name: string;
  Description: string;
  NutritionalInformation?: string;
  Price: number;
  UrlImage: string;
  Visible?: boolean;
  Stock?: number;
  Category: string;
  amount?: number;
}
