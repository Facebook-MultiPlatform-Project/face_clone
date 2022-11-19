import axios from "axios";
import { SecureStore } from "expo";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const access_token = await SecureStore.getItemAsync("access_token");
  if (access_token) config.headers.authorization = access_token;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
