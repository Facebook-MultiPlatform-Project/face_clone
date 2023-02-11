import axiosClient from "../axiosClient";

export const PostApi = {
  getAll: () => {
    const url = "/posts/all";
    return axiosClient.get(url);
  },
  getPost: (id) => {
    const url = "/posts/get-by-id";
    return axiosClient.post(url, { postId: id });
  },
  getPostByUser: (params) => {
    const url = "/posts/posts-by-user";
    console.log(params);
    return axiosClient.get(url, params);
  },
  deletePost: (id) => {
    const url = `/posts/delete-post/${id}`;
    return axiosClient.delete(url);
  },
  likePost: (id) => {
    const url = `/posts/like-post/${id}`;
    return axiosClient.put(url);
  },
};
