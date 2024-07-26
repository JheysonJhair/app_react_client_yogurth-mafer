import axios from "axios";

const CART_API_URL =
  "https://bkmaferyogurt-production.up.railway.app/api/cart/insert";

interface AddToCartRequest {
  IdUser: any;
  IdProduct: number;
  Quantity: number;
}

interface ApiResponse2 {
  msg: string;
  success: boolean;
}

export const addToCart = async (
  request: AddToCartRequest
): Promise<ApiResponse2> => {
  try {
    const response = await axios.post<ApiResponse2>(CART_API_URL, request);

    return response.data;
  } catch (error) {
    return { msg: "Error al actualizar el carrito", success: false };
  }
};
// services/Cart.ts

const API_URL = "https://bkmaferyogurt-production.up.railway.app/api/cart";

interface Product {
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

interface CartItemResponse {
  IdCartItem: number;
  Quantity: number;
  DateAdded: string;
  Product: Product;
  Cart:any
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  msg?: string;
}

export const getCartByUserId = async (userId: number): Promise<ApiResponse<CartItemResponse[]>> => {
  try {
    const response = await fetch(`${API_URL}/getCartByUserId/${userId}`);
    const data = await response.json();
    if (response.ok) {
      return {
        msg: data.msg,
        success: true,
        data: data.data, // `data` puede ser undefined, manejarlo en el componente
      };
    } else {
      return {
        success: false,
        msg: data.msg || "Error al obtener el carrito",
      };
    }
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    return {
      success: false,
      msg: "Error de conexión",
    };
  }
};

// services/Cart.ts

interface DeleteCartItemResponse {
  success: boolean;
  msg: string;
}

export const deleteCartItem = async (idCartItem: number): Promise<DeleteCartItemResponse> => {
  try {
    const response = await fetch(`${API_URL}/deleteCartItem/${idCartItem}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (response.ok) {
      return {
        success: data.success,
        msg: data.msg,
      };
    } else {
      return {
        success: false,
        msg: data.msg || "Error al eliminar el artículo del carrito",
      };
    }
  } catch (error) {
    console.error("Error al eliminar el artículo del carrito:", error);
    return {
      success: false,
      msg: "Error de conexión",
    };
  }
};
// services/Cart.ts

interface ClearCartResponse {
  success: boolean;
  msg: string;
}

export const clearAllCartItems = async (idUser: number): Promise<ClearCartResponse> => {
  try {
    const response = await fetch(`https://bkmaferyogurt-production.up.railway.app/api/cart/deleteAll/${idUser}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (response.ok) {
      return {
        success: data.success,
        msg: data.msg,
      };
    } else {
      return {
        success: false,
        msg: data.msg || "Error al eliminar todos los artículos del carrito",
      };
    }
  } catch (error) {
    console.error("Error al eliminar todos los artículos del carrito:", error);
    return {
      success: false,
      msg: "Error de conexión",
    };
  }
};
