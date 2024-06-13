import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUser } from "./actions/server";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard", "/checkout", "/orders", "/inventory"];
const publicRoutes = [
  "/login",
  "/signup",
  "/",
  "/boardgames",
  "/about",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get("token")?.value;
  const user = await getCurrentUser(cookie);

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  // if (isPublicRoute && user && !req.nextUrl.pathname.startsWith("/")) {
  //   return NextResponse.redirect(new URL("/", req.nextUrl));
  // }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
