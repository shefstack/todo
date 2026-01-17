import type { NextAuthOptions } from "next-auth"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { stat } from "fs"
 export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            name:"Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },

            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Response("Invalid credentials", { status: 401 })
                }

                const user= await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })
                if(!user) throw new Error("User not found")
                const isValid= await bcrypt.compare(
                    credentials.password, user.password
                )
                if(!isValid) throw new Error("Invalid credentials")
                return  {
                    id: user.id,
                    email: user.email,
                    
                }
            }
        })
    ]

}