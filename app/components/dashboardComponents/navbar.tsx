import React from 'react'
import { useAuth } from '~/contexts/AuthContext'

const Navbar = () => {
    const {logout, addingProduct,authenticated, checkCarrello } = useAuth()
    return (
        <div className="flex justify-between items-center mb-6">
            <button 
                onClick={authenticated}
                    className=""
                >
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </button>
            
            <button 
                onClick={addingProduct}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                Aggiungi nuovi prodotti
            </button>
            <button 
                onClick={checkCarrello}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                Carrello
            </button>
            <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
                Logout
            </button>
            {//Aggiungere funzione visualizzazione numero elementi nel carrello tramite cookie
            }
        </div>
  )
}

export default Navbar