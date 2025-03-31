"use server";

import { SignInSchema } from "@/schemas/auth-schemas";
import { AxiosError } from "axios";
import { createSession } from "@/actions/session";
import { SessionPayload } from "@/types";
import { api } from "@/lib/api";

export const signIn = async (credentials: SignInSchema) => {
  try {
    const client = await api();
    const { data } = await client.auth.signIn(credentials);

    const sessionPayload = data as SessionPayload;

    await createSession(sessionPayload);
  } catch (e) {
    const error = e as AxiosError;
    if (error?.response?.status === 404) {
      throw new Error("Invalid credentials. Please try again.");
    }
  }
};

const signUp = async (formData: FormData) => {};
