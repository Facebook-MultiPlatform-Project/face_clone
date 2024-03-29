import axiosClient from "../axiosClient";

export const UserApi = {
  getAll: () => {
    const url = "/user/all";
    return axiosClient.get(url);
  },
  getInfo: (id) => {
    const params = { id: id };
    console.log(params);
    const url = "/user/user";
    return axiosClient.get(url, { params });
  },
  getProfile: () => {
    const url = "/user/get-profile";
    return axiosClient.get(url);
  },
  getBlock: () => {
    const url = "/user/block-list";
    return axiosClient.get(url, {params: {take: 10, skip: 0}});
  },
  updateProfile: (data) => {
    const url = "/user/update-profile";
    return axiosClient.put(url, data);
  },
  setBlock: (data) => {
    const url = "/user/block";
    return axiosClient.post(url, data);
  },
};
