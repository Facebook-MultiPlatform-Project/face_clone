import axiosClient from "../axiosClient";

export const upPostApi = {
  post: (data) => {
    const url = "/posts/create";
    return axiosClient.post(url, data);
  },
};
