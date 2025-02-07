/** @format */

import { signUpSchema } from "@/components/SignUpForm";
import { API_URL } from "@/lib/constants";
import { z } from "zod";

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
	signUpSchema.parse(data);
	console.log(data);
	const body = JSON.stringify(data);

	const response = await fetch(`${API_URL}/auth/signup`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body,
	});

	if (response.ok) {
		return true;
	} else {
		const { message } = await response.json();
		throw new Error(message);
	}
};
