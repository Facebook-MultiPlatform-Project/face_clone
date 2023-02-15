import axiosClient from "../axiosClient";

export const MessageApi = {
  creatRoom: (id) => {
    const url = "/room/create";
    return axiosClient.post(url, { id });
  },
  listRoom: () => {
    const url = "/room/list-rooms";
    return axiosClient.get(url, { params: { take: 50, skip: 0 } });
  },
  getMessages: (roomId) => {
    const url = "room/messages";
    return axiosClient.get(url, { params: { roomId, take: 50, skip: 0 } });
  },
};
