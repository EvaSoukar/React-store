import axios from 'axios';

const getOrders = async (token) => {
  const response = await axios.get('https://js2-ecommerce-api.vercel.app/api/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const createOrder = async (orderData, token) => {
  const response = await axios.post('https://js2-ecommerce-api.vercel.app/api/orders', orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export default {
  getOrders,
  createOrder,
};