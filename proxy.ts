// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { NextAuthResult } from "next-auth/lib/types"

export async function middleware(req: NextRequest) {
  // Direct cookie check - NO internal API calls
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET,
    raw: true  // Raw JWT, no validation overhead
  })

  const pathname = req.nextUrl.pathname
  const isAuthPage = pathname.startsWith("/auth") || pathname.startsWith("/register")
  const isTodosPage = pathname.startsWith("/todos")

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/todos", req.url))
  }

  if (!token && isTodosPage) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/todos/:path*", "/auth", "/register"],
}
