import axiosClient from "../axiosClient";

export const FriendApi = {
  checkFriend: (id) => {
    const url = `/friends/status/${id}`;
    return axiosClient.get(url);
  },
  sendRequest: (id) => {
    const url = "/friends/set-request-friend";
    return axiosClient.post(url, { id: id });
  },
  getRequest: () => {
    const url = "/friends/get-requested-friends";
    return axiosClient.get(url);
  },
  setAccept: (data) => {
    const url = "/friends/set-accept-friend";
    return axiosClient.post(url, data);
  },
  cancelRequest: (id) => {
    const url = "/friends/cancel-request";
    return axiosClient.post(url, { id: id });
  },
  removeFriend: (id) => {
    const url = "/friends/set-remove-friend";
    return axiosClient.put(url, { id: id });
  },
  getListFriend: () => {
    const url = "/friends/get-user-friends";
    return axiosClient.get(url);
  },
};
