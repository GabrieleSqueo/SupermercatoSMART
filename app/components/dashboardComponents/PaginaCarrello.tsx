import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const PaginaCarrello = () => {
  const [cookies] = useCookies(['carrello'])
  const [totale, setTotale] = useState(0)
  const carrelloAttuale = cookies.carrello ? [...cookies.carrello] : []

  useEffect(() => {
    const somma = carrelloAttuale.reduce((acc, prodotto) => {
      const prezzo = parseFloat(prodotto.prezzo) * prodotto.quantità || 0
      return acc + prezzo
    }, 0)
    setTotale(somma.toFixed(2))
  }, [cookies.carrello])

  return (
    <div
      style={{
        backgroundColor: '#d9f0ff', // celeste chiaro
        minHeight: '100vh',
        width: '100%',          // usa 100% invece di 100vw
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#003366',
        boxSizing: 'border-box',
        margin: 0,
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Carrello</h2>

        {carrelloAttuale.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Il carrello è vuoto.</p>
        ) : (
          carrelloAttuale.map((prodotto, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid #a3c0ff',
              }}
            >
              <div>
                <strong>{prodotto.nome}</strong> x{prodotto.quantità}
                {prodotto.descrizione && (
                  <div style={{ fontSize: '0.85rem', color: '#004a99' }}>
                    {prodotto.descrizione}
                  </div>
                )}
              </div>
              <div>{parseFloat(prodotto.prezzo).toFixed(2)} €</div>
            </div>
          ))
        )}

        <div
          style={{
            marginTop: '25px',
            textAlign: 'right',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          Totale: {totale} €
        </div>
      </div>
    </div>
  )
}

export default PaginaCarrello
