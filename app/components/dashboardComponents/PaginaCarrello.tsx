import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import PopupMessage from './PopupMessage'

const PaginaCarrello = () => {

  const handleCompra = async(e: any) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/api/newOrder`, {
        body: JSON.stringify({
          prodotti: carrelloAttuale,
          costoTotale: totale,
          utente: cookiesUtente.utente,
          refreshToken: cookiesUtente.refreshToken
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookiesUtente.AccessToken}`
        },
      })

      const data = await res.json();
      if (res.ok) {
        setCookie("carrello", [], { path: '/' })
        setMessage("Ordine effettuato con successo!")
        setShowPopup(true)
      } else if (res.status === 401) {
        if (data.accessToken) {
          setCookieUtente('AccessToken', data.accessToken, { path: '/' })
          setMessage("Sessione scaduta: access token rinnovato. Riprova a inviare l'ordine.")
          setShowPopup(true)
        }
      } else {
        setMessage(data.message)
        setShowPopup(true)
      }
    } catch (error) {
      setMessage("Errore di rete o del server. Riprova.")
      setShowPopup(true)
    }
  }
  const [cookiesUtente, setCookieUtente] = useCookies(['utente', 'AccessToken',"refreshToken"])
  const [cookies, setCookie] = useCookies(['carrello'])
  const [totale, setTotale] = useState(0)
  const [message, setMessage] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const carrelloAttuale = cookies.carrello ? [...cookies.carrello] : []

  useEffect(() => {
    const somma = carrelloAttuale.reduce((acc, prodotto) => {
      const prezzo = parseFloat(prodotto.prezzo) * prodotto.quantità || 0
      return acc + prezzo
    }, 0)
    setTotale(somma.toFixed(2))
  }, [cookies.carrello])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center py-8">
      <div className="w-full max-w-lg mx-auto bg-white/90 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">Carrello</h2>
        
        {showPopup && message && (
          <PopupMessage message={message} onClose={() => setShowPopup(false)} />
        )}
        
        {carrelloAttuale.length === 0 ? (
          <p className="text-center text-blue-700">Il carrello è vuoto.</p>
        ) : (
          <div className="divide-y divide-blue-100">
            {carrelloAttuale.map((prodotto, index) => (
              <div
                key={index}
                className="flex justify-between items-start py-4"
              >
                <div>
                  <span className="font-bold text-blue-900">{prodotto.nome}</span> <span className="text-blue-700">x{prodotto.quantità}</span>
                  {prodotto.descrizione && (
                    <div className="text-sm text-blue-500 mt-1">{prodotto.descrizione}</div>
                  )}
                </div>
                <div className="font-semibold text-blue-800">{parseFloat(prodotto.prezzo).toFixed(2)} €</div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 text-right font-bold text-xl text-blue-900">
          Totale: {totale} €
        </div>
        <button 
          onClick={handleCompra}
          className="w-full mt-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow transition text-lg">
          Compra
        </button>
      </div>
    </div>
  )
}

export default PaginaCarrello
