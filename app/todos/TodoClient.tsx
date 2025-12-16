"use-client"
import {Todo} from"@/lib/todos"
import {useEffect,useState} from"react"

export default function TodoClient(){
    const [todo,setTodo] = useState<Todo[]>([])
    const [inputData,setInputData]=useState("")

    useEffect(()=>{
fetch('/api/todos').then((res)=>res.json()).then((data)=>setTodo(data))
    },[])


    const handleAdd=async()=>{
        
    }
}