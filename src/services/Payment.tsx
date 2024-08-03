import axios from "axios";

const apiUrl = "http://localhost:3000/api";

export const getFormToken = async (paymentConf: {
  amount: number;
  currency: string;
}) => {
  const response = await axios.post(`${apiUrl}/checkout`, { paymentConf });
  return response.data.formtoken;
};

export const validatePayment = async (paymentData: any) => {
  const response = await axios.post(`${apiUrl}/validate`, paymentData);
  return response;
};
