"use client"

import { nanoid } from "nanoid";
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function TodoActions() {
    const [inputValue, setInputValue] = useState("");
    const [inputerror, setInputError] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter()

    async function addTodo() {
        const trimmedValue = inputValue.trim();

        if (!trimmedValue) {
            setInputError(true);
            return;
        }

        const payload = { title: trimmedValue }

        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            setError(true);
            console.error('Failed to add todo', await response.text());
            return;
        }

        setInputValue(""); 
        router.refresh();
    }

    return (
        <div className="flex flex-col gap-2 my-6">
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTodo()} 
                    placeholder="Enter a new task..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black transition-all"
                />
                <button 
                    onClick={addTodo}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-200"
                >
                    Add
                </button>
            </div>

            {inputerror && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    
                    <div 
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setInputError(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full transform transition-all scale-100 animate-in fade-in zoom-in duration-300">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <span className="text-red-600 text-xl font-bold">!</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Oops! Empty Task</h3>
                            <p className="text-gray-500 mb-6 text-sm">
                                Please enter some text before adding a todo item.
                            </p>
                            <button 
                                onClick={() => setInputError(false)}
                                className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {error && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    <div 
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setError(false)}
                    ></div>

                   <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full transform transition-all scale-100 animate-in fade-in zoom-in duration-300">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <span className="text-red-600 text-xl font-bold">!</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Same Task!!!</h3>
                            <p className="text-gray-500 mb-6 text-sm">
                                Please enter a todo item that is not already in the list.
                            </p>
                            <button 
                                onClick={() => setError(false)}
                                className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}