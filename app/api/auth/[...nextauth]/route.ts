export const runtime = "nodejs"
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

console.log("VERCEL SECRET:", process.env.NEXTAUTH_SECRET)
const handler = NextAuth({ ...authOptions, secret: process.env.NEXTAUTH_SECRET });
export { handler as GET, handler as POST }