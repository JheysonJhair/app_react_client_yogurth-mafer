import axios from "axios";
import { Product } from "../types/Product";

const API_URL = "https://bkmaferyogurt-production.up.railway.app/api/product";

// Definición de la estructura de la respuesta de la API
interface ApiResponse {
  msg: string;
  data: Product[];
  success: boolean;
}

// Función para obtener productos
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw new Error("Error al obtener productos");
  }
};
