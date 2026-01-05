import { NextResponse } from "next/server";
import { todoList } from "../../../lib/todo-store";
import { nanoid } from "nanoid";

export async function GET(){
    console.log("GET request received",todoList );   
    return NextResponse.json( todoList,{status:200} );
    
}

export async function POST(request:Request){
const data=await request.json();

    const exists = todoList.find(t => 
        t.todoItem.toLowerCase() === data.todoItem.toLowerCase()
    );

    if (exists) {
        return NextResponse.json({ error: "Already exists" }, { status: 400 });
    }
todoList.push(data);
return NextResponse.json( todoList,{status:201}); 

   
}


export async function DELETE(request:Request){
    const data=await request.json();
    const index = todoList.findIndex(t => t.id === data.id);
    if (index === -1) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    todoList.splice(index, 1);
    return NextResponse.json( todoList,{status:200});
}

export async function PATCH(request:Request){
    const data=await request.json();
    const todo = todoList.find(t => t.id === data.id);
    if (!todo) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    todo.completed = !todo.completed;
    data.todoItem = todo.todoItem;
    return NextResponse.json( todoList,{status:200});
}