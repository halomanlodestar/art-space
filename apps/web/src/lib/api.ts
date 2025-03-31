import { getSession } from "@/actions/session";
import axios from "axios";
import {
  AuthApi,
  CommunitiesApi,
  Configuration,
  LikesApi,
  PostsApi,
  UsersApi,
} from "@art-space/openapi";

export const api = async () => {
  const { accessToken } = await getSession();

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  });

  const config = new Configuration({
    basePath: process.env.NEXT_PUBLIC_API_URL,
  });

  return {
    auth: new AuthApi(config, undefined, axiosInstance),
    users: new UsersApi(config, undefined, axiosInstance),
    posts: new PostsApi(config, undefined, axiosInstance),
    communities: new CommunitiesApi(config, undefined, axiosInstance),
    likes: new LikesApi(config, undefined, axiosInstance),
  };
};
