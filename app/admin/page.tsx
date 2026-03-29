import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminPage() { 
  const currentUser = await getCurrentUser()

  if (currentUser?.role !== "admin") {
    redirect("/todos")
  }

  const [usersCount, todosCount, users, todos] = await Promise.all([
    prisma.user.count(),
    prisma.todo.count(),
    prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.todo.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    }),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 md:py-10 space-y-10">
        
        {/* HEADER */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1 text-base sm:text-lg">Overview of system users and activity.</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* User Card */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Users</p>
              <p className="text-4xl font-bold text-gray-900">{usersCount}</p>
            </div>
          </div>

          {/* Todo Card */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-full flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Todos</p>
              <p className="text-4xl font-bold text-gray-900">{todosCount}</p>
            </div>
          </div>
        </div>

        {/* USERS TABLE */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-3 sm:px-6">Email</th>
                  <th className="px-4 py-3 sm:px-6">Role</th>
                  <th className="px-4 py-3 sm:px-6">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4 sm:px-6 font-medium text-gray-900 break-words">{user.email}</td>
                    <td className="px-4 py-4 sm:px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin" 
                          ? "bg-red-50 text-red-700" 
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 sm:px-6 text-gray-500 whitespace-nowrap">
                      {user.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TODOS TABLE */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Recent Todos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-3 sm:px-6">Title</th>
                  <th className="px-4 py-3 sm:px-6">Owner</th>
                  <th className="px-4 py-3 sm:px-6">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {todos.map(todo => (
                  <tr key={todo.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4 sm:px-6 text-gray-900 break-words">{todo.title}</td>
                    <td className="px-4 py-4 sm:px-6 text-gray-500 break-words">{todo.user.email}</td>
                    <td className="px-4 py-4 sm:px-6 text-gray-500 whitespace-nowrap">
                      {todo.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}