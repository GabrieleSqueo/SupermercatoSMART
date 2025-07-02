import React from 'react'
import { useAuth } from '~/contexts/AuthContext'
import { useCookies } from 'react-cookie'

const Navbar = () => {
    const {logout, addingProduct,authenticated, checkCarrello } = useAuth()
    const [cookies] = useCookies(['carrello'])
    // Calcola il totale prodotti nel carrello
    const carrello = cookies.carrello || []
    const totaleProdotti = carrello.reduce((acc, prod) => acc + (prod.quantità || 0), 0)
    return (
        <nav className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl shadow-lg mb-8">
            <button 
                onClick={authenticated}
                className="focus:outline-none"
            >
                <h1 className="text-3xl font-bold text-white tracking-wide drop-shadow">Dashboard</h1>
            </button>
            <div className="flex gap-4">
                <button 
                    onClick={addingProduct}
                    className="bg-white/90 text-blue-700 px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-100 transition-colors focus:outline-none"
                >
                    Aggiungi nuovi prodotti
                </button>
                <div className="relative">
                  <button 
                      onClick={checkCarrello}
                      className="bg-white/90 text-green-700 px-5 py-2 rounded-lg font-semibold shadow hover:bg-green-100 transition-colors focus:outline-none"
                  >
                      Carrello
                  </button>
                  {totaleProdotti > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg border-2 border-white ">
                      {totaleProdotti}
                    </span>
                  )}
                </div>
                <button
                    onClick={logout}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition-colors focus:outline-none"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar