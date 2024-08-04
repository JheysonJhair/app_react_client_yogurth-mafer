import axios from 'axios';

export const insertSale = async (data: any) => {
  const response = await axios.post('https://bkmaferyogurt-production.up.railway.app/api/sale/insert', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};
