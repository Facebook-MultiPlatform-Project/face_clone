import axiosClient from "../axiosClient";

export const verifyApi = {
  post: (data) => {
    const url = "/auth/confirm";
    return axiosClient.post(url, data);
  },
};
