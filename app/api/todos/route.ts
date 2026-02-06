import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(req:Request) {
    const token = await getToken({
      req: req as any,
      secret: process.env.NEXTAUTH_SECRET,
    })
    if (!token) {
      return new Response("Unauthorized", { status: 401 })
    }
    const todos = await prisma.todo.findMany({
      where: {
        userId: token.id as string,
      },
    })
    return NextResponse.json(todos, { status: 200 })
    
}

export async function POST(req: Request) {
  const token = await getToken({
    req: req as any,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { title } = await req.json()

    if (!title || typeof title !== "string") {
      return new Response("Title is required", { status: 400 })
    }

  const todo = await prisma.todo.create({
    data: {
      userId: token.id as string,
      title,
      completed: false,
    },
  })

  return Response.json(todo)
}

export async function DELETE(request:Request, {params}:{params:{id:string}}){
    const token = await getToken({
        req: request as any,
        secret: process.env.NEXTAUTH_SECRET,
      })
    
      if (!token) {
        return new Response("Unauthorized", { status: 401 })
      }   
      // Support sending id in the URL params or in the request body
      const body = await request.json().catch(() => ({}))
      const id = params?.id || body?.id
      if (!id) {
        return new Response("ID is required", { status: 400 })
      }

      const todo = await prisma.todo.findUnique({
        where: {
          id,
        },
      })
   
    if(!todo){
        return new Response("Not found", { status: 404 })
    }
    if (todo.userId !== token.id) {
        return new Response("Forbidden", { status: 403 })
      }
      await prisma.todo.delete({
        where: {
          id,
        },
      })
      return new Response(null, { status: 204 })
     
    }
export async function PUT(request:Request, {params}:{params:{id:string}}){
    const token = await getToken({
        req: request as any,
        secret: process.env.NEXTAUTH_SECRET,
      })
    
      if (!token) {
        return new Response("Unauthorized", { status: 401 })
      }
    const data=await request.json();
    const id = params?.id || data?.id
    if (!id) {
      return new Response("ID is required", { status: 400 })
    }
    const todo = await prisma.todo.findUnique({
        where: {
          id,
        },
      })
      if (!todo) {
        return new Response("Not found", { status: 404 })
      }
      if (todo.userId !== token.id) {
        return new Response("Forbidden", { status: 403 })
      }
      const updatedTodo = await prisma.todo.update({
        where: {
          id,
        },
        data: {
          title: data.todoItem || todo.title,
          completed: typeof data.completed === "boolean" ? data.completed : (data.toggleCompleted ? !todo.completed : todo.completed),
        },
      })
      return NextResponse.json(updatedTodo, { status: 200 })   
    } 
   