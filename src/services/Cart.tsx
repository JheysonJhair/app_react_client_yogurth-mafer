import axios from "axios";

const CART_API_URL =
  "https://bkmaferyogurt-production.up.railway.app/api/cart/insert";

interface AddToCartRequest {
  IdUser: any;
  IdProduct: number;
  Quantity: number;
}

interface ApiResponse {
  msg: string;
  success: boolean;
}

export const addToCart = async (
  request: AddToCartRequest
): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(CART_API_URL, request);

    return response.data;
  } catch (error) {
    return { msg: "Error al actualizar el carrito", success: false };
  }
};
