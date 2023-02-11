import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosClient = axios.create({
  baseURL: "http://172.16.3.229:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const access_token = await SecureStore.getItemAsync("access_token");

  if (access_token) config.headers["Authorization"] = "Bearer " + access_token;
  return config;
});

export default axiosClient;
