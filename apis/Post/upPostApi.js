import axiosClient from "../axiosClient";

export const upPostApi = {
  post: (data) => {
    const url = "/posts/create";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  edit: (data) => {
    const url = "/posts/edit";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
