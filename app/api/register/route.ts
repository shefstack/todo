export const runtime = "nodejs"


import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
export async function POST(request:Request){
    const {email,password}= await request.json();
    if(!email || !password){
        return new Response("Missing fields", {status:400});
    }
    const existingUser = await prisma.user.findUnique({
        where:{
            email
        }
    });
    if(existingUser){
        return new Response("User already exists", {status:400});
    }
    const hashedPassword= await bcrypt.hash(password, 10);
    const user= await prisma.user.create({
        data:{
            email,
            password: hashedPassword
        }
    });
    return new Response(JSON.stringify({id: user.id, email: user.email}), { status:201 });
}   