import axios from "axios";
import { Login } from "../types/User";

const API_URL = "https://bkmaferyogurt-production.up.railway.app/api";

//---------------------------------------------------------------- LOGIN
export const login = async (loginData: Login) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/login`,
      loginData
    );
    return response.data;
  } catch (error) {
    console.error("API: Error al iniciar sesión", error);
    throw new Error("API: Error al iniciar sesión");
  }
};
