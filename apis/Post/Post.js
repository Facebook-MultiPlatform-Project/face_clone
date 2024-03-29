import axiosClient from "../axiosClient";

export const PostApi = {
  getAll: (params) => {
    const url = "/posts";
    return axiosClient.get(url, { params });
  },
  getPost: (id) => {
    const url = "/posts/get-by-id";
    return axiosClient.post(url, { postId: id });
  },
  getPostByUser: (params) => {
    const url = "/posts/posts-by-user";
    console.log(params);
    return axiosClient.get(url, { params });
  },
  deletePost: (id) => {
    const url = `/posts/delete-post`;
    return axiosClient.post(url, { postId: id });
  },
  likePost: (id) => {
    const url = `/posts/like-post`;
    return axiosClient.post(url, { postId: id });
  },
};
