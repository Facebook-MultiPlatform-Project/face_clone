import axiosClient from "../axiosClient";

export const signupApi = {
  post: (data) => {
    const url = "/auth/signup";
    return axiosClient.post(url, data);
  },
};
