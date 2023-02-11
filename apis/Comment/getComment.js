import axiosClient from "../axiosClient";
export const getAllComment = {
  post: (data) => {
    const url = "/comment/get-comments";
    return axiosClient.post(url, data);
  },
};

