import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard", "/checkout", "/account", "/inventory"];
const publicRoutes = [
  "/login",
  "/register",
  "/",
  "/boardgames",
  "/contact-us",
  "/terms-of-service",
];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  // let user = null;
  // 3. Decrypt the session from the cookie
  const token = cookies().get("token")?.value;

  // if (cookies().get("token")?.value) {
  //   user = await getCurrentUser(cookie);
  // }

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
