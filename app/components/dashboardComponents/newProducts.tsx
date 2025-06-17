import { useState } from "react"

const NewProducts =()=>{
    const [name,setName] = useState("");
    const [prezzo,setPrezzo] = useState("");
    const [descrizione,setDescrizione] = useState("");
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const res = await fetch ("http://localhost:5000/api/newProducts",{
                body : JSON.stringify({
                    name : name,
                    prezzo : prezzo,
                    descrizione : descrizione,

                }),
                method : "POST",
                headers: { "Content-Type": "application/json" },
            })
        } catch (error : any) {
            console.error("Errore:", error.message);
        }
    };

    return(
        <div>
            <form
            onSubmit={handleSubmit}> 
                <input
                type = "text"
                value = {name}
                onChange={(e) =>setName(e.target.value)}
                required
                className="mt-1 w-full px-5 py-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-black text-lg font-semibold placeholder-gray-500"
                />

                <input
                type = "number"
                value = {prezzo}
                onChange={(e) =>setPrezzo(e.target.value)}
                required
                className="mt-1 w-full px-5 py-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-black text-lg font-semibold placeholder-gray-500"
                />
                <input
                type = "text"
                value = {descrizione}
                onChange={(e) =>setDescrizione(e.target.value)}
                required
                className="mt-1 w-full px-5 py-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-black text-lg font-semibold placeholder-gray-500"
                />
                <button
                    type = "submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                    > 
                    Invia
                </button>
            </form>

        </div>

    )



}

export default NewProducts