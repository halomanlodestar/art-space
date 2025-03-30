import { getSession } from "@/actions/session";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  // This is a placeholder for middleware logic
  // You can implement your authentication or authorization logic here

  const url = req.nextUrl;

  const session = await getSession();

  const isAuthPage = url.pathname.startsWith("/auth");

  if (!session) {
    return NextResponse.redirect(new URL("/auth", url));
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", url));
  }
};

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
