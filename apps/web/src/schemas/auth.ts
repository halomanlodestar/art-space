/** @format */

import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const signUpSchema = z.object({
  username: z.string().min(3),
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});