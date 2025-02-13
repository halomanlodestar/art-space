/** @format */

"use server";
import { signInSchema, signUpSchema } from "@/schemas/auth";
import { z } from "zod";
import {AuthApi} from "@/lib/api-client"

export const getToken = () => {};

export const signIn = async (formData: z.infer<typeof signInSchema>) => {
	const data = signInSchema.parse(formData);
	const authApi = new AuthApi()

	
};

export const signUp = async (formData: z.infer<typeof signUpSchema>) => {
	const data = signUpSchema.parse(formData);

	api.;
};
