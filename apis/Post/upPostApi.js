import axiosClient from "../axiosClient";

export const upPostApi = {
  post: (data) => {
    const url = "/posts/create";
    console.log("api");
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
