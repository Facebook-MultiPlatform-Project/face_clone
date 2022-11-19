import axiosClient from "../axiosClient";

export const loginApi = {
  login: (data) => {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },
};
