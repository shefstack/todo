"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname();

  // Guard clause: Only show for admins
  if (session?.user?.role !== "admin") {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              Admin Panel
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {pathname !== "/todos" && (
              <Link 
                href="/todos" 
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
              >
                Todos
              </Link>
            )}
            
            {pathname !== "/admin" && (
              <Link 
                href="/admin" 
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
            )}
            
            {/* Example of active link styling for the current page */}
            <span className="px-4 py-2 rounded-md text-sm font-medium text-blue-700 bg-blue-50">
              {pathname === "/admin" ? "Dashboard" : "Todos"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}