import TodoActions from "./TodoActions"

async function getTodos() {
  const res = await fetch("http://localhost:3000/api/todos", {
    cache: "no-store",
  })

  if (!res.ok) throw new Error("Failed to fetch todos")
  return res.json()
}

export default async function TodosPage() {
  const todos = await getTodos()

  return (
    <>
      <h1 className="text-3xl font-bold underline">Todo Page</h1>

      <ul>
        {todos.map((item:any) => (
          <li key={item.id}>
            <span>{item.todoItem}</span>
            <TodoActions item={item} />
          </li>
        ))}
      </ul>
    </>
  )
}
