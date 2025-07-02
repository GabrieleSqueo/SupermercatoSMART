import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const ProductItem = ({ prodotto }: any) => {
  const [cookies, setCookie] = useCookies(['carrello'])
  const [added, setAdded] = useState(false)

  const handleAdd = (prodotto: any) => {
    const carrelloAttuale = cookies.carrello ? [...cookies.carrello] : []
    const indiceTrovato = carrelloAttuale.findIndex(
      (prod) => prod.nome === prodotto.nome
    )

    if (indiceTrovato !== -1) {
      carrelloAttuale[indiceTrovato].quantità += 1
    } else {
      carrelloAttuale.push({ ...prodotto, quantità: 1 })
    }

    setCookie('carrello', carrelloAttuale, { path: '/' })
    setAdded(true)
    setTimeout(() => setAdded(false), 1000)
  }

  const handleRemove = (prodotto: any) => {
    const carrelloAttuale = cookies.carrello ? [...cookies.carrello] : []
    const indiceTrovato = carrelloAttuale.findIndex(
      (prod) => prod.nome === prodotto.nome
    )

    if (indiceTrovato !== -1) {
      if (carrelloAttuale[indiceTrovato].quantità > 1) {
        carrelloAttuale[indiceTrovato].quantità -= 1
      } else {
        carrelloAttuale.splice(indiceTrovato, 1)
      }
      setCookie('carrello', carrelloAttuale, { path: '/' })
    }
  }

  return (
    <div className="w-full bg-white/80 rounded-2xl p-6 mb-6 shadow-lg flex flex-col md:flex-row items-center gap-8 border border-blue-100 hover:shadow-2xl transition">
      {prodotto.foto && (
        <img
          src={prodotto.foto}
          alt={prodotto.nome}
          className="h-40 w-40 object-cover rounded-xl border-2 border-blue-200 shadow"
        />
      )}
      <div className="flex-1 w-full">
        <p className="text-blue-900 font-bold text-2xl mb-1">{prodotto.nome}</p>
        <p className="text-blue-700 font-semibold text-lg mb-2">{prodotto.prezzo}€</p>
        {prodotto.descrizione && (
          <p className="text-blue-700 italic mb-2 text-base">{prodotto.descrizione}</p>
        )}
      </div>
      <div className="flex flex-row md:flex-col gap-2 items-center relative">
        <button
          type="button"
          onClick={() => handleAdd(prodotto)}
          className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 font-bold text-xl shadow transition focus:outline-none ${added ? 'animate-pulse scale-110 ring-4 ring-green-400' : ''}`}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => handleRemove(prodotto)}
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-5 py-2 font-bold text-xl shadow transition"
        >
          −
        </button>
        {added && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow animate-fade-in-out z-10">
            Aggiunto!
          </span>
        )}
      </div>
    </div>
  )
}

export default ProductItem
