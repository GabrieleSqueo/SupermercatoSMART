import { useState } from "react";
import { useAuth } from "~/contexts/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth()


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Errore durante la registrazione");
      }

      console.log("Registrazione completata");
    } catch (error: any) {
      console.error("Errore:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-200 p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold italic text-center text-gray-800">Registrati qui</h2>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full px-5 py-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-black text-lg font-semibold placeholder-gray-500"
            placeholder="Inserisci il tuo nome"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full px-5 py-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-black text-lg font-semibold placeholder-gray-500"
            placeholder="Inserisci la tua email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full px-5 py-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-black text-lg font-semibold placeholder-gray-500"
            placeholder="Inserisci la tua password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Registra
        </button>
        <div className="text-center pt-4">
          <p className="text-sm text-gray-700">Non hai un account?</p>
          <button
            type="button"
            onClick= {login}
            className="mt-2 text-blue-700 hover:underline font-medium"
          >
            Vai al login
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default Register;
