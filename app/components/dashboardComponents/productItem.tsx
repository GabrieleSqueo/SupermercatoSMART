import React from 'react'
import { useCookies } from 'react-cookie'

const ProductItem = ({ prodotto }: any) => {
  const [cookies, setCookie] = useCookies(['carrello'])

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
    <div className="w-full bg-blue-100 rounded-lg p-6 mb-4 shadow-sm flex items-center gap-6">
      {prodotto.foto && (
        <img
          src={prodotto.foto}
          alt={prodotto.nome}
          className="h-48 w-48  object-cover rounded-lg border border-blue-300"
        />
      )}
      <div className="flex-1">
        <p className="text-blue-900 font-bold text-xl">{prodotto.nome}</p>
        <p className="text-blue-700 font-semibold">{prodotto.prezzo}€</p>
        {prodotto.descrizione && (
          <p className="text-blue-700 italic mt-2 text-sm">{prodotto.descrizione}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => handleAdd(prodotto)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 font-semibold transition"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => handleRemove(prodotto)}
          className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 font-semibold transition"
        >
          −
        </button>
      </div>
    </div>
  )
}

export default ProductItem
