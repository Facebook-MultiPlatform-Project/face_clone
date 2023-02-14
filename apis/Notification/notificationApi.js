import axiosClient from "../axiosClient";

export const NotificationApi = {
  getAll: () => {
    const url = "/notification";
    return axiosClient.get(url, {params: {take: 10, skip: 0}});
  },
}