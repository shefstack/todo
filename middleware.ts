import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })


  const isAuthPage =
    req.nextUrl.pathname.startsWith("/auth") ||
    req.nextUrl.pathname.startsWith("/register")

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/todos", req.url))
  }

  if (!token && req.nextUrl.pathname.startsWith("/todos")) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/todos/:path*", "/auth", "/register"],
}