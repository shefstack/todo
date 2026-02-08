
import { getToken } from "next-auth/jwt"
import { cookies, headers } from "next/headers"
import { NextRequest } from "next/server"
import { prisma } from "./prisma"

export async function getCurrentUser() {
  const headersList = await headers()
  const cookiesList = await cookies()
  
  const headersInit = new Headers(headersList)
  const cookieHeader = cookiesList.getAll().map(c => `${c.name}=${c.value}`).join("; ")
  if (cookieHeader) {
    headersInit.set("Cookie", cookieHeader)
  }
  
  const request = new NextRequest(new URL("http://localhost:3000"), {
    headers: headersInit,
  })
  
  const token = await getToken({
    secret: process.env.NEXTAUTH_SECRET,
    req: request
  })
  if (!token?.id) {
    throw new Error("Unauthorized")
  }

  const user = prisma.user.findUnique({
    where: {
      id: token.id,
    },
  })
  return user
}

export async function requireAdminRole() {
  const user = await getCurrentUser()
  if (user?.role !== "admin") {
    throw new Error("Unauthorized")
  }
  return user
}