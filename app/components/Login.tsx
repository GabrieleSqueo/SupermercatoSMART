import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useCookies } from 'react-cookie';

const Login = () => {
  const [cookies, setCookie] = useCookies(['utente', 'token'])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<any>({});
  const { authenticated, register } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("https://supermercato-smart.vercel.app/api/login", {
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
        console.log(data)
        setCookie('utente', data.user.id, { path: '/' })
        setCookie('token', data.accessToken, { path: '/' })
      } else {
        setData({ message: data.message, status: res.status });
      }
    } catch (error) {
      setData({ message: "Errore nella richiesta", status: 500 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-cyan-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-8"
      >
        <h2 className="text-3xl font-bold italic text-center text-blue-700 mb-4">Login</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-5 py-3 border-2 border-blue-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 text-black text-lg font-semibold placeholder-gray-400 bg-white"
              placeholder="Inserisci la tua email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-5 py-3 border-2 border-blue-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 text-black text-lg font-semibold placeholder-gray-400 bg-white"
              placeholder="Inserisci la tua password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition text-lg shadow"
        >
          Accedi
        </button>

        {data?.message && (
          <p
            className={`text-sm text-center mt-2 ${
              data.status === 200 ? "text-green-600" : "text-red-600"
            }`}
          >
            {data.message}
          </p>
        )}

        <div className="text-center pt-4">
          <p className="text-sm text-blue-700">Non hai un account?</p>
          <button
            type="button"
            onClick={register}
            className="mt-2 text-blue-700 hover:underline font-semibold"
          >
            Registrati
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
