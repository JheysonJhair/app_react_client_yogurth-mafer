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

export interface ProductDetail {
  IdProduct: number;
  UrlImage: string;
  Category: string;
  Name: string;
  Price: number;
  Description: string;
  NutritionalInformation: string;
}

export interface ProductContextType {
  products: ProductDetail[];
}

export interface ApiResponse {
  msg: string;
  data: Product[];
  success: boolean;
}