import axios from "axios";

const BASE_URL = "https://ecommerce-fullstack-api-gwnu.onrender.com";

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products/`);
  return response.data;
};

export const getProductDetail = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}/`);
  return response.data;
};



export const createOrder = async (items, token) => {
  const response = await axios.post(
    `${BASE_URL}/orders/`,
    { items },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

