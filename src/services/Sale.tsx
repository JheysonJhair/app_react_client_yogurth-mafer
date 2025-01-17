import axios from "axios";
const API_URL = "https://bkmafer.jhedgost.com/api";

//---------------------------------------------------------------- POST SALE
export const insertSale = async (data: any) => {
  const response = await axios.post(`${API_URL}/sale/insert`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
