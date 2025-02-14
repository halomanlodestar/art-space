/** @format */

"use server";

import { AuthApi, PostsApi } from "@art-space/openapi";

import { signInSchema, signUpSchema } from "@/schemas/auth";
import { z } from "zod";

const authApi = new AuthApi();

export const getToken = async () => {};

export const signIn = async (values: z.infer<typeof signInSchema>) => {
	const data = signInSchema.parse(values);
	const res = (await authApi.signIn(data)).data;
	const a = (await new PostsApi().getAllPosts()).data;
};

export const signUp = async (values: z.infer<typeof signUpSchema>) => {};
