import { AuthApi, PostsApi, CommunitiesApi, LikesApi, UsersApi } from "./api";

export const client = {
  auth: new AuthApi(),
  users: new UsersApi(),
  posts: new PostsApi(),
  communities: new CommunitiesApi(),
  likes: new LikesApi(),
};
