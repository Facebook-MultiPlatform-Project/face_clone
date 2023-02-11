import axiosClient from "../axiosClient";

export const AvatarApi = {
  updateAvatar: (data) => {
    const url = "/user/save-avatar";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateCover: (data) => {
    const url = "/user/save-cover";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
