"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function EditTodoActions({ todoItem }: { todoItem: { id: string, title: string, completed: boolean } }) {
  const router = useRouter();
const [edit,setEdit]=useState(false);
const [inputValue, setInputValue] = useState(todoItem.title);
const [error,setError]=useState(false);
const {data:session}=useSession()
  async function deleteFirstTodo() {
    try {
      const delRes = await fetch('/api/todos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: todoItem.id })
      });

      if (!delRes.ok) {
        console.error('Failed to delete todo');
        return;
      }

      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  async function toggleCompletion() {
   setEdit(false);
    try {
      const id = todoItem.id;
      const patchRes = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, toggleCompleted: true })
      });
  
      if (!patchRes.ok) {       
        console.error('Failed to update todo');
        return;
      }
  
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  function editTodoItem(){
    setEdit(true);
  }

  async function saveEdit(){
    try{
      const id = todoItem.id;
      const inputValueTrimmed = inputValue.trim();
      const patchRes = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, todoItem: inputValueTrimmed!=='' ? inputValueTrimmed : todoItem.title })
      });

      if(!patchRes.ok){
        console.error('Failed to update todo');
        return;
      }
      setEdit(false);
      router.refresh();
    }catch(err){
      console.error(err);
    }
    if(inputValue.trim()===''){
      setError(true);
      setInputValue(todoItem.todoItem);
      return;
    } 
    
  }

  if (edit) {
    return (
      <div className="flex items-center gap-2 w-full animate-in fade-in duration-200">
        <input 
          autoFocus
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && saveEdit()} 
          className="flex-1 px-3 py-1 text-sm border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-black"
        />
        <button onClick={saveEdit} 
        //  disabled={inputValue.}
        className="text-md font-bold text-green-600 hover:text-green-700 px-2 py-1">Save</button>
        <button onClick={() => {setEdit(false); setInputValue(todoItem.todoItem)}} className="text-md font-bold text-gray-400 hover:text-gray-600 px-2 py-1">Cancel</button>
      </div>

    );
  }

  return (
    <div>
      <button onClick={deleteFirstTodo} className=
      "px-4 py-2  text-white rounded-lg hover:bg-red-500 " disabled={edit}>
        <Image src="/delete.svg" alt="Delete" width={20} height={20} />
      </button>
      <button onClick={()=>{toggleCompletion()}} disabled={edit} className="ml-4 px-4 py-2  text-white rounded-lg hover:bg-green-500">
      {/* {todoItem.completed ? "Mark Incomplete" : "Mark Complete"} */}
       <Image src="/check-mark.svg" alt="Delete" width={20} height={20} />
      </button>
      {!edit && (
        <button onClick={()=>{editTodoItem()}} className="px-4 py-2 text-white rounded-lg hover:bg-blue-500">
           <Image src="/edit-246.svg" alt="Delete" width={20} height={20} />
        </button>
      )}
       {error && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    
                    <div 
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setError(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full transform transition-all scale-100 animate-in fade-in zoom-in duration-300">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <span className="text-red-600 text-xl font-bold">!</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Oops! Empty Task</h3>
                            <p className="text-gray-500 mb-6 text-sm">
                                Please enter some text before saving the todo item.
                            </p>
                            <button 
                                onClick={() => setError(false)}
                                className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
 
                
    </div>
  )
}