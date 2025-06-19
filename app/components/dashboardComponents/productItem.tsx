import React, { useState } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'



const ProductItem = ({prodotto}: any) => {
  const [cookies, setCookie] = useCookies(['carrello'])

  const handleAdd = (prodotto: any) => {
    // Prendi il carrello attuale o array vuoto
    const carrelloAttuale = cookies.carrello ? [...cookies.carrello] : [];
    // Aggiungi il nuovo prodotto
    carrelloAttuale.push(prodotto);
    // Aggiorna il cookie
    setCookie('carrello', carrelloAttuale, { path: "/" });
    console.log(carrelloAttuale);
  }

  return (
    
    <div>{prodotto.nome}
        <p>{prodotto.prezzo}€</p>
        <button
        type='button'
        onClick={() =>{
          handleAdd(prodotto)}}
        className='bg-blue-500'
        >
          +
        </button>
    </div>
    
  )
}

export default ProductItem