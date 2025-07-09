import { useState } from "react"
import { useAuth } from "~/contexts/AuthContext";

const NewProducts = () => {
  const { authenticated } = useAuth()

  const [name, setName] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [foto, setFoto] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/api/newProducts`, {
        body: JSON.stringify({
          name: name,
          prezzo: prezzo,
          descrizione: descrizione,
          foto: "./productsImages/" + foto
        }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    } catch (error: any) {
      console.error("Errore:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center py-8">
      <form onSubmit={handleSubmit} className="bg-white/90 rounded-2xl shadow-2xl p-10 w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Aggiungi un nuovo prodotto</h2>
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-1">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full px-5 py-3 border-2 border-blue-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 text-black text-lg font-semibold placeholder-gray-400 bg-white"
            placeholder="Nome prodotto"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-1">Prezzo</label>
          <input
            type="number"
            value={prezzo}
            onChange={(e) => setPrezzo(e.target.value)}
            required
            className="mt-1 w-full px-5 py-3 border-2 border-blue-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 text-black text-lg font-semibold placeholder-gray-400 bg-white"
            placeholder="Prezzo in euro"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-1">Descrizione</label>
          <input
            type="text"
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
            required
            className="mt-1 w-full px-5 py-3 border-2 border-blue-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 text-black text-lg font-semibold placeholder-gray-400 bg-white"
            placeholder="Descrizione breve"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-1">Link foto</label>
          <input
            type="text"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            required
            className="mt-1 w-full px-5 py-3 border-2 border-blue-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 text-black text-lg font-semibold placeholder-gray-400 bg-white"
            placeholder="Nome file immagine (es: banana.jpg)"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition text-lg shadow mt-2"
        >
          Invia
        </button>
      </form>
    </div>
  )
}

export default NewProducts
