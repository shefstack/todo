"use client"
import { useRouter } from "next/navigation";

export default function EditTodoActions({ todoItem }: { todoItem: { id: string,todoItem:string, completed: boolean } }) {
  const router = useRouter();

  async function deleteFirstTodo() {
    try {
      const res = await fetch('/api/todos', { cache: 'no-store' });
      if (!res.ok) {
        console.error('Failed to fetch todos');
        return;
      }

      const data = await res.json();
      if (data.length === 0) {
        console.warn('No todos to delete');
        return;
      }

      const id = todoItem.id;
console.log(id);
      const delRes = await fetch('/api/todos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
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
    try {
      const id = todoItem.id;
      const todolist = todoItem.todoItem
      const patchRes = await fetch('/api/todos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id ,todolist})
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

  return (
    <div>
      <button onClick={deleteFirstTodo} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
        Delete Todo
      </button>
      <button onClick={toggleCompletion} className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      {todoItem.completed ? "Mark Incomplete" : "Mark Complete"}
      </button>
      {/* <button onClick={toggleCompletion} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
        Edit Todo
      </button> */}
    </div>
  )
}