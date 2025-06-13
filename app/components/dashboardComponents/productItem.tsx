import React from 'react'

const ProductItem = ({prodotto}: any) => {
    console.log(prodotto)
  return (
    <div>{prodotto.nome}
        <p>{prodotto.prezzo}€</p>
    </div>
    
  )
}

export default ProductItem