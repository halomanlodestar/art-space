import {
  AuthApi,
  CommunitiesApi,
  LikesApi,
  Configuration,
  PostsApi,
  UsersApi,
} from "@art-space/openapi";
import axios from "axios";

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL;
const baseURL = process.env.NEXT_PUBLIC_SITE_URL;

if (!apiBaseURL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

// ✅ Create a single axios instance
const apiClient = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const apiConfig = new Configuration({
  basePath: apiBaseURL,
});

// ✅ Export the API client
export const api = {
  auth: new AuthApi(apiConfig, undefined, apiClient),
  users: new UsersApi(apiConfig, undefined, apiClient),
  posts: new PostsApi(apiConfig, undefined, apiClient),
  likes: new LikesApi(apiConfig, undefined, apiClient),
  communities: new CommunitiesApi(apiConfig, undefined, apiClient),
};
