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
      const delRes = await fetch(`/api/todos/${todoItem.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: todoItem.id })
      });
      if (!delRes.ok) return;
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  async function toggleCompletion() {
    setEdit(false);
    try {
      const id = todoItem.id;
      const patchRes = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, toggleCompleted: !todoItem.completed ,todoItem: todoItem.title})
      });
      if (!patchRes.ok) return;
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  async function saveEdit() {
    const inputValueTrimmed = inputValue.trim();
    if (inputValueTrimmed === '') {
      setError(true);
      setInputValue(todoItem.title);
      return;
    }

    try{
      const id = todoItem.id;
      const patchRes = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, todoItem: inputValueTrimmed!=='' ? inputValueTrimmed : todoItem.title, toggleCompleted: false  })
      });

      if (!patchRes.ok) return;
      setEdit(false);
      router.refresh();
    }catch(err){
      console.error(err);
    }
  }

  

  if (edit) {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full animate-in fade-in duration-200">
        <input
          autoFocus
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
          className="w-full sm:flex-1 px-3 py-2 text-sm border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-black"
        />
        <div className="flex gap-1 w-full sm:w-auto justify-end">
          <button onClick={saveEdit} className="text-sm font-bold text-green-600 hover:bg-green-50 px-3 py-2 rounded-md transition-colors">Save</button>
          <button onClick={() => { setEdit(false); setInputValue(todoItem.title) }} className="text-sm font-bold text-gray-400 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
      <button 
        onClick={deleteFirstTodo} 
        className="p-2 text-white rounded-lg hover:bg-red-500 transition-colors" 
        title="Delete"
      >
        <Image src="/delete.svg" alt="Delete" width={18} height={18} className="opacity-70 hover:opacity-100" />
      </button>

      <button 
        onClick={toggleCompletion} 
        className="p-2 text-white rounded-lg hover:bg-green-500 transition-colors"
        title="Toggle Complete"
      >
        <Image src="/check-mark.svg" alt="Complete" width={18} height={18} className={todoItem.completed ? "opacity-100" : "opacity-40"} />
      </button>

      <button 
        onClick={() => setEdit(true)} 
        className="p-2 text-white rounded-lg hover:bg-blue-500 transition-colors"
        title="Edit"
      >
        <Image src="/edit-246.svg" alt="Edit" width={18} height={18} className="opacity-70 hover:opacity-100" />
      </button>
      
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black backdrop-blur-sm transition-opacity" onClick={() => setError(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-[90%] sm:max-w-sm w-full animate-in zoom-in duration-200">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <span className="text-red-600 text-xl font-bold">!</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Oops! Empty Task</h3>
              <p className="text-gray-500 mb-6 text-sm">Please enter some text before saving the todo item.</p>
              <button onClick={() => setError(false)} className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
