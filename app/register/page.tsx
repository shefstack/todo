"use client"
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState({ message: "", isError: false })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setStatus({ message: "", isError: false })

        try {
            const res = await axios.post('/api/register', { email, password })
            if (res.status === 201) {
                setStatus({ message: 'Registration successful! Redirecting...', isError: false })
                await router.replace('/auth')
                return
            }
        } catch (err: any) {
            const statusErr = err.response?.status
            const serverMsg = err.response?.data?.message
            
            if (statusErr === 400) {
                setStatus({ message: 'User already exists. Please log in.', isError: true })
            } else {
                setStatus({ 
                    message: serverMsg || 'An unexpected error occurred.', 
                    isError: true 
                })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                   
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                disabled={loading}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-base"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                required
                                disabled={loading}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-base"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                   

                    {status.message && (
                        <div className={`text-sm text-center p-2 rounded ${status.isError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {status.message}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>

                    <div className="text-center">
                        <Link href="/auth" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}