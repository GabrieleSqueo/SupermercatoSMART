import { useState } from "react";
import { useAuth } from "~/contexts/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {login} = useAuth()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/api/register`, {
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
      setSuccessMessage("Registrazione avvenuta con successo! Ora puoi effettuare il login.");
      setEmail("");
      setName("");
      setPassword("");
    } catch (error: any) {
      setErrorMessage(error.message || "Errore durante la registrazione");
      console.error("Errore:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-cyan-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-8"
      >
        <h2 className="text-3xl font-bold italic text-center text-blue-700 mb-4">Registrati qui</h2>
        {successMessage && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center font-semibold">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 text-center font-semibold">
            {errorMessage}
          </div>
        )}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full px-5 py-3 border-2 border-blue-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 text-black text-lg font-semibold placeholder-gray-400 bg-white"
              placeholder="Inserisci il tuo nome"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Email</label>
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
            <label className="block text-sm font-semibold text-blue-700 mb-1">Password</label>
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
          Registra
        </button>
        <div className="text-center pt-4">
          <p className="text-sm text-blue-700">Hai già un account?</p>
          <button
            type="button"
            onClick={login}
            className="mt-2 text-blue-700 hover:underline font-semibold"
          >
            Vai al login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
