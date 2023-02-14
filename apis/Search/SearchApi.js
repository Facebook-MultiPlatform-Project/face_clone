import axiosClient from "../axiosClient";

export const SearchApi = {
  search: (data) => {
    const url = "/search/search";
    return axiosClient.post(url, data);
  },
}