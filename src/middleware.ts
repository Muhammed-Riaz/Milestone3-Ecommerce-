import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    if (!req.nextUrl.pathname.startsWith("/sign-in")) {
      return redirectToSignIn({ returnBackUrl: "/dashboard" });
    }
    return NextResponse.next();
  }

  // ✅ Agar user `/dashboard` pe ja raha hai toh allow karo
  if (isDashboardRoute(req)) {
    return NextResponse.next();
  }
});

export const config = {
  matcher: ["/dashboard"],
};
