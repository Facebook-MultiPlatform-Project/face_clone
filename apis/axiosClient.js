import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosClient = axios.create({
  baseURL: "http://192.168.1.22:8000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  // const access_token = await SecureStore.getItemAsync("access_token");
  // const refresh_token = await SecureStore.getItemAsync("refresh_token");
  // const access_token = await window.localStorage.getItem("access_token");
  // if (access_token) config.headers.authorization = access_token;
  return config;
});

export default axiosClient;
