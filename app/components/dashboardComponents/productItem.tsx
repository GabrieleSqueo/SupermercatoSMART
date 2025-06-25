import React, { useState } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'



const ProductItem = ({prodotto}: any) => {
  const [cookies, setCookie] = useCookies(['carrello'])

  const handleAdd = (prodotto: any) => {
    // Prendi il carrello attuale o array vuoto
    const carrelloAttuale = cookies.carrello ? [...cookies.carrello] : [];
    // Cerca se il prodotto è già nel carrello
    const indiceTrovato = carrelloAttuale.findIndex((prod) => prod.nome === prodotto.nome);

    if (indiceTrovato !== -1) {
      // Se esiste, incrementa la quantità
      carrelloAttuale[indiceTrovato].quantità += 1;
    } else {
      // Se non esiste, aggiungilo con quantità 1
      carrelloAttuale.push({ ...prodotto, quantità: 1 });
    }
    setCookie('carrello', carrelloAttuale, { path: "/" });
    console.log(carrelloAttuale);
  }

  return (
    
    <div className='flex gap-2'>
      {prodotto.foto && <img src={prodotto.foto} className='h-8 w-8'/>}
      {prodotto.nome}
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