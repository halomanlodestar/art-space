/** @format */

"use server";

import AuthClient from "@art-space/openapi/auth";

import { signInSchema, signUpSchema } from "@/schemas/auth";
import { date, z } from "zod";

export const getToken = async () => {};

export const signIn = async (values: z.infer<typeof signInSchema>) => {
	const data = signInSchema.parse(values);

	const res = await AuthClient.authControllerSignIn({
		data,
	});

	console.log(res);
};

export const signUp = async (values: z.infer<typeof signUpSchema>) => {};
