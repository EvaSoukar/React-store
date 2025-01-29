import axios from 'axios';

const sendMessage = async (contactData) => {
  const response = await axios.post('https://js2-ecommerce-api.vercel.app/api/messages', contactData);
  return response;
};

export default {
  sendMessage,
};