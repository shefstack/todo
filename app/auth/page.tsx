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

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (!res?.ok) {
      const err = String(res?.error || "Invalid credentials")
      const status = res?.status

      if (status === 404 || /no user|not found|no account|user/i.test(err)) {
        setErrorMessage("No account found with this email.")
      } else if (status === 401 || /invalid credentials|wrong password|incorrect password/i.test(err)) {
        setErrorMessage("The password you entered is incorrect.")
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.")
      }

      setIsLoading(false)
      return
    }

    setPassword("")
    await router.replace("/todos")
  }

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault()
//     setErrorMessage("")
//         setPassword("")
//         setIsLoading(true)

//     try {
//             const res = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//             })

//       if (!res) {
//         setErrorMessage("Sign in failed. Please try again.")
//                 setIsLoading(false)
//         return
//       }

//       if (!res.ok) {
//         const err = String(res.error || "Invalid credentials")
//         const status = res.status
//         if (status === 404 || /no user|not found|no account|user/i.test(err)) {
//           setErrorMessage("No account found with this email.")
//           setIsLoading(false)
//           return
//         }

//         if (status === 401 || /invalid credentials|wrong password|incorrect password/i.test(err)) {
//           setErrorMessage("The password you entered is incorrect.")
//           setIsLoading(false)
//           return
//         }

//         setErrorMessage(res.error || "An unexpected error occurred. Please try again.")
//         setIsLoading(false)
//         return
//       }

//       if (res.ok && !errorMessage) {
       
//         setIsLoading(false)
//         router.replace("/todos")
//         router.refresh()
//       }
//     } catch (err) {
//       setErrorMessage("An unexpected error occurred. Please try again.")
//       setIsLoading(false)
//     }
//     if(!email || !password){
//       setErrorMessage("Please enter both email and password.")
//       setIsLoading(false)
//       return
//     }
    
        
//   }
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 sm:px-6">
            <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
                        Sign in to your account
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
                                autoComplete="email"
                                required
                                disabled={isLoading}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
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
                                autoComplete="current-password"
                                required
                                disabled={isLoading}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                   

                    {errorMessage && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md text-center border border-red-100" aria-live="polite">
                            {errorMessage}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white transition-all ${
                                isLoading 
                                ? "bg-indigo-400 cursor-not-allowed" 
                                : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                            }`}
                        >
                            {isLoading  ? "Signing in..." : "Login"}
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

  // return (
  //   <div className="auth-page">
  //     <form className="auth-form" onSubmit={handleLogin}>
  //       <h1>Login</h1>
  //       <input
  //         className="input"
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         required
  //       />
  //       <input
  //         className="input"
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         required
  //       />
  //       <button className="btn" type="submit" disabled={!!errorMessage}>
  //         Login
  //       </button>
  //       <div style={{ marginTop: 8, textAlign: "center" }}>
  //         {errorMessage && <p className="text-red-500 mb-2 text-center">{errorMessage}</p>}
  //         <Link href="/register">Create Account</Link>
  //       </div>
  //     </form>
  //   </div>
  // )
}
