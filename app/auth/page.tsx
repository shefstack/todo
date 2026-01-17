"use client"
import React, { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setErrorMessage("")
        setIsLoading(true)

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (!res) {
                setErrorMessage("Sign in failed. Please try again.")
                setIsLoading(false)
                return
            }

            if (!res.ok) {
                const err = String(res.error || "")
                // Custom error messaging logic
                if (res.status === 401) {
                    setErrorMessage("Invalid email or password.")
                } else {
                    setErrorMessage(err || "An unexpected error occurred.")
                }
                setIsLoading(false)
                return
            }

            // Success
            router.replace("/todos")
        } catch (err) {
            setErrorMessage("An unexpected error occurred. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Welcome back! Please enter your details.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                  

                    {errorMessage && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md text-center border border-red-100">
                            {errorMessage}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-all ${
                                isLoading 
                                ? "bg-indigo-400 cursor-not-allowed" 
                                : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                            }`}
                        >
                            {isLoading ? "Signing in..." : "Login"}
                        </button>
                    </div>

                    <div className="text-center">
                        <span className="text-sm text-gray-600">Don't have an account? </span>
                        <Link 
                            href="/register" 
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                        >
                            Create Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}