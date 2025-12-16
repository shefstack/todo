import {NextResponse} from 'next/server'

let todos=[{
    id:1,todoList:"Learn Next.js"
}]

export  async function GET(){
return NextResponse.json(todos)
}

export async function POST(request:Request)
{
    const body=await request.json()
    todos.push(body)
    return NextResponse.json({message:"Added Successfully"})
}

export async function DELETE(request:Request){
    const body =await request.json()

todos=todos.filter((element)=>{element.id != body.id})
return NextResponse.json({message:"Deleted Successfully"})
}