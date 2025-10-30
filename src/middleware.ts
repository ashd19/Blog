// logout button for logged in users !!

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
// define protected routes ...
const protectedRoutes = ["/profile", "/post/create", "/post/edit"];

// get the session from better auth docs ...
export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const session = getSessionCookie(request);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathName.startsWith(route)
  );
  if (isProtectedRoute && !session) {
    // redirect user to auth page since user is not loggedin / authenticated
    return NextResponse.redirect(new URL("/auth", request.url));
   
   
  }
  // if user is already logged in and is accessingt the auth page /route
  // redirect to homepage
  if (pathName === "/auth" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/post/create", "/post/edit/:path*", "/auth"],
};
