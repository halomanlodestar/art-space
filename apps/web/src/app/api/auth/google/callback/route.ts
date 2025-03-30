import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/actions/session";
import { redirect } from "next/navigation";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");
  const user = searchParams.get("user");

  if (!accessToken || !refreshToken || !user) {
    return NextResponse.json({ message: "Missing tokens" }, { status: 400 });
  }

  await createSession({ accessToken, refreshToken, user: JSON.parse(user) });

  redirect("/");
};
