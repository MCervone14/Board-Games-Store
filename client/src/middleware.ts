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
  // 3. Decrypt the session from the cookie
  const user = cookies().get("user")?.value;

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (!isProtectedRoute) {
    const res = NextResponse.next();
    res.headers.set(
      "Cache-Control",
      "public, max-age=604800, stale-while-revalidate=59"
    );
    return res;
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
