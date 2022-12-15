import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosClient = axios.create({
  baseURL: "http://10.90.34.79:8000",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const access_token = await SecureStore.getItemAsync("access_token");
  console.log(access_token);
  // const refresh_token = await SecureStore.getItemAsync("refresh_token");
  // const access_token = await window.localStorage.getItem("access_token");
  if (access_token) config.headers.authorization = access_token;
  return config;
});

export default axiosClient;
