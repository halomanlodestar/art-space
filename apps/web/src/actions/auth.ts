"use server";

import { createClient } from "@art-space/openapi/client";
import { cookies } from "next/headers";
import { SignInSchema } from "@/schemas/auth-schemas";
import { AxiosError } from "axios";
import { createSession } from "@/actions/session";

export const signIn = async (credentials: SignInSchema) => {
  const client = createClient();

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
