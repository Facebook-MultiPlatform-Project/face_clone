import axiosClient from "../axiosClient";

export const verifyApi = {
  post: (data) => {
    const url = "/email/confirm";
    return axiosClient.post(url, data);
  },
};
