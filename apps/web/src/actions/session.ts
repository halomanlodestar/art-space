"use server";

import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { SessionPayload, SessionPayloadWithExpiration } from "@/types";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  SESSION_EXPIRES_IN,
} from "@/lib/constants";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";

const SESSION_EXPIRATION_TIME = "30d";
const SESSION_SECRET = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(SESSION_SECRET);

export const getSession = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return {
      user: undefined,
      accessToken: undefined,
      refreshToken: undefined,
    };
  }

  try {
    const { payload: session } = await jwtVerify<SessionPayloadWithExpiration>(
      sessionCookie.value,
      encodedKey,
      {
        algorithms: ["HS256"],
      },
    );

    console.log(session);

    if (session.refreshTokenExpires < Date.now()) {
      await deleteSession();
      redirect("/auth");
    }

    if (session.accessTokenExpires < Date.now()) {
      fetch("/api/session/update", {
        method: "POST",
        body: JSON.stringify({
          accessToken: session.accessToken,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (!data.success) {
            await deleteSession();
            redirect("/auth");
          }
          console.log("Session updated ✅");
        })
        .catch(async (err) => {
          console.error("Error updating session:", err);
          await deleteSession();
          redirect("/auth");
        });
    }

    return session;
  } catch (e) {
    console.error("Error verifying session:", e);
    await deleteSession();
    redirect("/auth");
  }
};

export const createSession = async (payload: SessionPayload) => {
  const expires = new Date(new Date().getTime() + SESSION_EXPIRES_IN);

  if (!SESSION_SECRET) {
    throw new Error("Session secret is not defined");
  }

  const sessionPayload: SessionPayloadWithExpiration = {
    ...payload,
    accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpires: Date.now() + REFRESH_TOKEN_EXPIRES_IN,
  };

  const session = await new SignJWT(sessionPayload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRATION_TIME)
    .sign(encodedKey);

  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires,
    sameSite: "lax",
    path: "/",
  });

  console.log("Session created ✅");
};

export const deleteSession = async () => {
  (await cookies()).delete("session");
};
