"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  async function logout() {
    await signOut({ redirect: false })
    router.replace("/auth")
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={logout}
      aria-label="Sign out"
      title="Sign out"
      className="inline-flex items-center gap-2 px-3 py-1.5   active:scale-85 text-gray-700 font-semibold rounded-md shadow-sm transition-transform focus:outline-none"
    >
     
      Logout
    </button>
  )
}
