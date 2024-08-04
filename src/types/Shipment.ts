export interface Product {
  IdProduct: number;
  Name: string;
  Price: number;
  UrlImage: string;
}

export interface CartItemResponse {
  IdCartItem: number;
  Quantity: number;
  Product: Product;
  Cart: any;
}

export interface Shipment {
  IdShipment: number;
  IdUser: number;
  Company: string;
  Region: string;
  Province: string;
  District: string;
  Address: string;
  DateAdd: string;
}
