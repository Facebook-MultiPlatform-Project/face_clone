import axiosClient from "../axiosClient";

export const NotificationApi = {
  getAll: () => {
    const url = "/notification";
    return axiosClient.get(url, {params: {take: 10, skip: 0}});
  },
  read: (list) => {
    const url = "/notification/read";
    return axiosClient.post(url, list);
  },
  active: (id) => {
    const url = "/notification/active";
    return axiosClient.get(url, {params: {id}});
  },
}