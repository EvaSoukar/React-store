import axios from 'axios';

const register = async (userData) => {
  const response = await axios.post('https://js2-ecommerce-api.vercel.app/api/auth/register', userData);
  return response;
};

const login = async (userData) => {
  console.log("USER DATA: ", userData)
  const response = await axios.post('https://js2-ecommerce-api.vercel.app/api/auth/login', userData);
  return response;
};

export default {
  register,
  login,
};