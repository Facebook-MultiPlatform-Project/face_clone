import axiosClient from "../axiosClient";

export const changePasswordApi = {
  changePassword: (data) => {
    const url = "/auth/change-password";
    return axiosClient.post(url, data);
  },
};
