import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req:Request) {
    const user = await getCurrentUser()
    if (!user) {
      return new Response("Unauthorized", { status: 401 })
    }
    const todos = await prisma.todo.findMany({
      where: {
        userId: user.id as string,
      },
    })
    return NextResponse.json(todos, { status: 200 })
    
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  if (!user.id) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { title } = await req.json()

    if (!title || typeof title !== "string") {
      return new Response("Title is required", { status: 400 })
    }

  const todo = await prisma.todo.create({
    data: {
      userId: user.id as string,
      title,
      completed: false,
    },
  })

  return Response.json(todo)
}

 