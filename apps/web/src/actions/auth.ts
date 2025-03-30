"use server";

import { SignInSchema } from "@/schemas/auth-schemas";
import { AxiosError } from "axios";
import { createSession } from "@/actions/session";
import { client } from "@art-space/openapi/client";

export const signIn = async (credentials: SignInSchema) => {
  try {
    const { data } = await client.auth.signIn(credentials);

    const sessionPayload = data as {
      accessToken: string;
      refreshToken: string;
    };

    await createSession(sessionPayload);
  } catch (e) {
    const error = e as AxiosError;
    if (error?.response?.status === 404) {
      throw new Error("Invalid credentials. Please try again.");
    }
  }
};

const signUp = async (formData: FormData) => {};
