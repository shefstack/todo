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
setPassword("")
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

  setIsLoading(false)
  if (!res?.ok) {
        const err = String(res?.error || "Invalid credentials")
        const status = res?.status
        if (status === 404 || /no user|not found|no account|user/i.test(err)) {
          setErrorMessage("No account found with this email.")
          setIsLoading(false)
          return
        }

        if (status === 401 || /invalid credentials|wrong password|incorrect password/i.test(err)) {
          setErrorMessage("The password you entered is incorrect.")
          setIsLoading(false)
          
                   setErrorMessage(res?.error || "An unexpected error occurred. Please try again.")
        setIsLoading(false)
       return
        }}
  router.replace("/todos")
  router.refresh()
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
