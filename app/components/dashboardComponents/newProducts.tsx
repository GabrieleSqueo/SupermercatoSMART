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
      const res = await fetch("http://localhost:5000/api/newProducts", {
        body: JSON.stringify({
          name: name,
          prezzo: prezzo,
          descrizione: descrizione,
          foto: "./public/productsImages/" + foto
        }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    } catch (error: any) {
      console.error("Errore:", error.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor:  "#cce4ff",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <p> Nome</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full px-5 py-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-black text-lg font-semibold placeholder-gray-500"
        />
        <p> Prezzo</p>
        <input
          type="number"
          value={prezzo}
          onChange={(e) => setPrezzo(e.target.value)}
          required
          className="mt-1 w-full px-5 py-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-black text-lg font-semibold placeholder-gray-500"
        />
        <p> Descrizione</p>
        <input
          type="text"
          value={descrizione}
          onChange={(e) => setDescrizione(e.target.value)}
          required
          className="mt-1 w-full px-5 py-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-black text-lg font-semibold placeholder-gray-500"
        />
        <p> Link foto</p>
        <input
          type="text"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          required
          className="mt-1 w-full px-5 py-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-black text-lg font-semibold placeholder-gray-500"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition mt-4"
        >
          Invia
        </button>
      </form>
    </div>
  )
}

export default NewProducts
