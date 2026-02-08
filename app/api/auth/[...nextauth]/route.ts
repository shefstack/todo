export const runtime = "nodejs"
import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth({ ...authOptions, secret: process.env.NEXTAUTH_SECRET });
export { handler as GET, handler as POST }