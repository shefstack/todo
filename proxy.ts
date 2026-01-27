import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./lib/auth"

export async function proxy(req: NextRequest) {
   const session =await getServerSession(authOptions)

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/auth") ||
    req.nextUrl.pathname.startsWith("/register")

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/todos", req.url))
  }

  if (!session && req.nextUrl.pathname.startsWith("/todos")) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/todos/:path*", "/auth", "/register"],
}
