"use client"

import { nanoid } from "nanoid";
import { useState  } from "react";
import { useRouter } from "next/navigation"


export default function TodoActions(){
    const [inputValue, setInputValue] = useState("");
    const router = useRouter()
async function addTodo(){
    const newTodo={id:nanoid(8), todoItem:inputValue}
    await fetch('/api/todos',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newTodo)
    })
  
    router.refresh();
}


return(

    <>
    <input type="text" onChange={(e)=>setInputValue(e.target.value)}/>
    <button onClick={()=>{addTodo(); setInputValue('')}}>Add Todo</button>
    </>
)

    }