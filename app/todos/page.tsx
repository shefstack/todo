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
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl overflow-hidden p-6 border border-gray-100">
        
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            My Tasks
          </h1>
          <p className="text-gray-500 text-sm mt-1">Keep track of your daily goals</p>
        </header>

        {/* Input Section */}
        <div className="mb-8">
          <TodoActions />
        </div>

        {/* List Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Todo List</h2>
          <ul className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-gray-400 py-4 italic">No tasks yet. Add one above!</p>
            ) : (
              todos.map((item: any) => (
                <li 
                  key={item.id} 
                  className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-xl transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {/* Blue dot decoration */}
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700 font-medium group-hover:text-blue-700">
                      {item.todoItem}
                    </span>
                    <input type="checkbox" className="ml-4"  />
                    <span className="ml-2 text-gray-400">Completed</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

      </div>
    </main>
  )
}