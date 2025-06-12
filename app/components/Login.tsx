import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<any>({});
  const { authenticated, register } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        authenticated();
        setData({ message: data.message, status: res.status });
      } else {
        setData({ message: data.message, status: res.status });
      }
    } catch (error) {
      setData({ message: "Errore nella richiesta", status: 500 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-200 p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold italic text-gray-800 text-center">Login</h2>
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
              className="mt-1 w-full px-5 py-3 border-2 border-blue-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-black text-lg font-semibold placeholder-gray-500"
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
              className="mt-1 w-full px-5 py-3 border-2 border-blue-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-black text-lg font-semibold placeholder-gray-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Accedi
        </button>

        {data?.message && (
          <p
            className={`text-sm text-center ${
              data.status === 200 ? "text-green-500" : "text-red-500"
            }`}
          >
            {data.message}
          </p>
        )}

        <div className="text-center pt-4">
          <p className="text-sm text-gray-700">Non hai un account?</p>
          <button
            type="button"
            onClick={register}
            className="mt-2 text-blue-700 hover:underline font-medium"
          >
            Registrati
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
