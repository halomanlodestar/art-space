/** @format */

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const signUpSchema = z.object({
	name: z.string().min(3),
	username: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(8),
});

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});
