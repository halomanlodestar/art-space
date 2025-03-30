"use server";

// import { Session } from "@/types";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { Session } from "@/types";
import { SESSION_EXPIRES_IN } from "@/lib/constants";
import { redirect } from "next/navigation";

const SESSION_EXPIRATION_TIME = "30d";
const SESSION_SECRET = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(SESSION_SECRET);

export const createSession = async (payload: Session) => {
  const expires = new Date(new Date().getTime() + SESSION_EXPIRES_IN);

  const session = await new SignJWT(payload)
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
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    throw new Error("Session cookie not found");
  }

  try {
    const { payload: session } = await jwtVerify<Session>(
      sessionCookie.value,
      encodedKey,
      {
        algorithms: ["HS256"],
      },
    );

    return session;
  } catch (e) {
    console.error("Error verifying session:", e);
    await deleteSession();
    redirect("/auth");
  }
};

export const deleteSession = async () => {
  (await cookies()).delete("session");
};
