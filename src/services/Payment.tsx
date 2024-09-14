import axios from "axios";

const apiUrl = "https://bkmafer.jhedgost.com/api";

//---------------------------------------------------------------- POST TOKEN IZIPAY
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
