import React, {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie'

const PaginaCarrello = () => {
    const [cookies, setCookie] = useCookies(['carrello'])
    const [totale, setTotale] = useState(0)
    const carrelloAttuale = cookies.carrello ? [...cookies.carrello] : [];
    
    useEffect(() => {
        const somma = carrelloAttuale.reduce((acc, prodotto) => {
            const prezzo = parseFloat(prodotto.prezzo)*prodotto.quantità || 0
            return acc + prezzo
        }, 0)
        setTotale(somma.toFixed(2))
    }, [cookies.carrello])

  return (
    //Prendere i cookie -> stampare tutto ciò che sta nei cookie -> Aggiungere il meno qui
    <div >
        {carrelloAttuale.map((prodotto) => 
        
            <div className='flex justify-between '>
                
                <h1 className='bold'>{prodotto.nome} <span className='ml-2 text-sm text-gray-600'>x{prodotto.quantità}</span></h1>
                <p>{prodotto.descrizione}</p>
                <p>Prezzo: {parseFloat(prodotto.prezzo).toFixed(2)} €</p>
                
            </div>
            
        )}
        <hr className="my-4 h-0.5 border-t-0 bg-black" />
        <div className='flex'><p className='ml-auto justify-end'>Totale: {totale} €</p></div>

    </div>
  )
}

export default PaginaCarrello