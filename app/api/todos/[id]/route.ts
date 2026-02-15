import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string } >}
) {
  const parmas = await context.params
  const { id } = parmas
  return Response.json({
    message: `Todo ${id}`
  })
}


export async function DELETE(request:Request, context: { params: Promise<{ id: string } >}){
  const params = await context.params
    const user = await getCurrentUser()
      if ( !user || !user.id) {
        return new Response("Unauthorized", { status: 401 })
      }   
      
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
    if (todo.userId !== user.id) {
        return new Response("Forbidden", { status: 403 })
      }
      await prisma.todo.delete({
        where: {
          id,
        },
      })
      return new Response(null, { status: 204 })
     
    }

export async function PUT(request:Request, context: { params: Promise<{ id: string } >}){
    const user = await getCurrentUser()
      if ( !user || !user.id) {
        return new Response("Unauthorized", { status: 401 })
      }
  
    const data=await request.json();
    const params = await context.params 
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
      if (todo.userId !== user.id) {
        return new Response("Forbidden", { status: 403 })
      }
      const updatedTodo = await prisma.todo.update({
        where: {
          id,
        },
        data: {
          title: data.todoItem || todo.title,
          completed: typeof data.toggleCompleted === "boolean" ? data.toggleCompleted : todo.completed,
        },
      })
      return NextResponse.json(updatedTodo, { status: 200 })   
    } 