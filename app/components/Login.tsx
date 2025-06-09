import React, {useState} from 'react'
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState({});
    const { authenticated } = useAuth();
    

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/login", {
            body: JSON.stringify({
                email: email,
                password: password
            }),
            method: "POST",
            headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                const data = await res.json();
                authenticated();
                setData({message: data.message, status: res.status});
            } else {
                const data = await res.json();
                setData({message: data.message, status: res.status});
            }
        } catch (error) {

            setData(error as string);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6"
        >
            <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                Email
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
            </div>
            </div>
            <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
            Accedi
            </button>
            {data ? data.status === 200 ? <p className="text-sm text-green-500 text-center">{data.message}</p> : <p className="text-sm text-red-500 text-center">{data.message}</p> : null}
        </form>
        </div>
  )
}

export default Login