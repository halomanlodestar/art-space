import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/actions/session";

export const middleware = async (req: NextRequest) => {
  const { accessToken } = await getSession();
  const url = req.nextUrl.pathname;
  const baseUrl = req.nextUrl.origin;

  const isAuthenticated = !!accessToken;

  console.log(isAuthenticated, url);

  const authPage = "/auth";

  if (url.includes(authPage) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", baseUrl));
  }
};

export const config = {
  matcher: ["/auth"],
};
