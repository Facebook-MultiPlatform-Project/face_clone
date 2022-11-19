import axiosClient from "../axiosClient";

export const logoutApi = {
  logout: () => {
    const url = "/auth/logout";
    return axiosClient.post(url);
  },
};
