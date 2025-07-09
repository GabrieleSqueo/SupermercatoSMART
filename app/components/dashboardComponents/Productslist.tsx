import { useEffect, useState } from 'react';
import ProductItem from './productItem';

const Productslist = () => {
    const [prodotti, setProdotti] = useState([])

    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://supermercato-smart.vercel.app/api/products", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })

        if (!res.ok) { 
          throw new Error("Errore nei prodotti");
        }
        const data = await res.json();
        setProdotti(data);
      } catch (error) {
        console.error("Errore:", error);
      }
    }

    fetchProducts();
  }, []); 
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-100/80 p-6 rounded-2xl shadow flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-2 text-blue-800">Prodotti in Offerta</h2>
          <p className="text-blue-700">Visualizza le offerte del giorno</p>
        </div>
        <div className="bg-green-100/80 p-6 rounded-2xl shadow flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-2 text-green-800">Lista della Spesa</h2>
          <p className="text-green-700">Gestisci la tua lista della spesa</p>
        </div>
      </div>
      <div className="space-y-6">
        {prodotti && prodotti.map((prod) => <ProductItem prodotto={prod} /> ) }
      </div>
    </div>
  )
}

export default Productslist