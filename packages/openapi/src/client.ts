// import { AuthApi, PostsApi, CommunitiesApi, LikesApi, UsersApi } from "./api";
//
// export const client = {
//   auth: new AuthApi(),
//   users: new UsersApi(),
//   posts: new PostsApi(),
//   communities: new CommunitiesApi(),
//   likes: new LikesApi(),
// };
import { AuthApi, PostsApi, CommunitiesApi, LikesApi, UsersApi } from "./api";
import { Configuration } from "./configuration";

const API_BASE_URL = "http://localhost:8000"; // Change for production

export const createClient = (accessToken?: string) => {
  const config = new Configuration({
    basePath: API_BASE_URL,
    accessToken: accessToken ? `Bearer ${accessToken}` : undefined, // Auth Header
  });

  return {
    auth: new AuthApi(config),
    users: new UsersApi(config),
    posts: new PostsApi(config),
    communities: new CommunitiesApi(config),
    likes: new LikesApi(config),
  };
};
