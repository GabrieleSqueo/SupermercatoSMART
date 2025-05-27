import React, {useState} from 'react'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Qui puoi gestire la logica di login (es. chiamata API)
        console.log("Email:", email);
        console.log("Password:", password);
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
        </form>
        </div>
  )
}

export default Login