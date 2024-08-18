export interface AddToCartRequest {
    IdUser: any;
    IdProduct: number;
    Quantity: number;
  }
  
  export interface ApiResponse2 {
    msg: string;
    success: boolean;
  }
  
  export interface Product {
    IdProduct: number;
    Name: string;
    Description: string;
    NutritionalInformation: string;
    Price: number;
    UrlImage: string;
    Visible: boolean;
    Stock: number;
    Category: string;
  }
  
  export interface CartItemResponse {
    IdCartItem: number;
    Quantity: number;
    DateAdded: string;
    Product: Product;
    Cart: any;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    msg?: string;
  }
  
  export interface DeleteCartItemResponse {
    success: boolean;
    msg: string;
  }
  
  export interface ClearCartResponse {
    success: boolean;
    msg: string;
  }
  