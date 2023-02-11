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
  getBlock: () => {
    const url = "/user/block-list";
    return axiosClient.get(url);
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
