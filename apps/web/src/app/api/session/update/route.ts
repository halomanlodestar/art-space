import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { SessionPayload } from "@/types";
import { SESSION_EXPIRES_IN } from "@/lib/constants";

export async function POST(req: Request) {
  const SESSION_EXPIRATION_TIME = "30d";
  const SESSION_SECRET = process.env.SESSION_SECRET;
  const encodedKey = new TextEncoder().encode(SESSION_SECRET);
  const expires = new Date(new Date().getTime() + SESSION_EXPIRES_IN);

  try {
    const { accessToken } = await req.json();

    if (!accessToken) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session");
    console.log(cookieStore.getAll());

    console.log("sessionCookie", sessionCookie);

    if (!sessionCookie) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { payload } = await jwtVerify<SessionPayload>(
      sessionCookie.value,
      encodedKey,
      {
        algorithms: ["HS256"],
      },
    );

    cookieStore.delete("session");

    const session = await new SignJWT({ ...payload, accessToken })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime(SESSION_EXPIRATION_TIME)
      .sign(encodedKey);

    cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating session:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
