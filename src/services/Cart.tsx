import axios from "axios";
import {
  AddToCartRequest,
  ApiResponse2,
  CartItemResponse,
  ApiResponse,
  DeleteCartItemResponse,
  ClearCartResponse,
} from "../types/Cart";

const CART_API_URL =
  "https://bkmafer.jhedgost.com/api/cart/insert";

const API_URL = "https://bkmafer.jhedgost.com/api/cart";

//---------------------------------------------------------------- POST CART
export const addToCart = async (
  request: AddToCartRequest
): Promise<ApiResponse2> => {
  try {
    const response = await axios.post<ApiResponse2>(CART_API_URL, request);
    return response.data;
  } catch (error) {
    console.error("Error al añadir al carrito:", error);
    return { msg: "Error al actualizar el carrito", success: false };
  }
};

//---------------------------------------------------------------- GET CART BY ID 
export const getCartByUserId = async (
  userId: number
): Promise<ApiResponse<CartItemResponse[]>> => {
  try {
    const response = await fetch(`${API_URL}/getCartByUserId/${userId}`);
    const data = await response.json();
    if (response.ok) {
      return {
        success: true,
        data: data.data,
        msg: data.msg,
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

//---------------------------------------------------------------- DELETE CART ITEM
export const deleteCartItem = async (
  idCartItem: number
): Promise<DeleteCartItemResponse> => {
  try {
    const response = await fetch(`${API_URL}/deleteCartItem/${idCartItem}`, {
      method: "DELETE",
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

//---------------------------------------------------------------- DELETE ALL CART
export const clearAllCartItems = async (
  idUser: number
): Promise<ClearCartResponse> => {
  try {
    const response = await fetch(`${API_URL}/deleteAll/${idUser}`, {
      method: "DELETE",
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
