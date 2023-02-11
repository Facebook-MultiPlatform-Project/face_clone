import axiosClient from "../axiosClient";
export const postComment = {
  post: (data) => {
    const url = "/comment";
    const res = axiosClient.post(url, data); 
    return res
  },
};