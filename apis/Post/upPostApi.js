import axiosClient from "../axiosClient";

export const upPostApi = {
  post: (data) => {
    console.log("tao o day ne");
    const url = "/posts/create";
    return axiosClient.post(url, data);
  },
};
