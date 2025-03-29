/** @format */
"use server";

import { signInSchema } from "@/schemas/auth-schemas";
import { FormState } from "@/types";
import { z } from "zod";

export const signIn = async (
	currentState: {},
	data: z.infer<typeof signInSchema>
): Promise<FormState> => {
	console.log(data);
	return {
		success: true,
	};
};

export const signUp = async (): Promise<FormState> => {
	return {
		success: true,
	};
};
