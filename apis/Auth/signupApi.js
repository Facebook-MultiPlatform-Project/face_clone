import axiosClient from "../axiosClient";

export const signupApi = {
  signup: (data) => {
    const url = "/auth/signup";
    return axiosClient.post(url, data);
  },
};
