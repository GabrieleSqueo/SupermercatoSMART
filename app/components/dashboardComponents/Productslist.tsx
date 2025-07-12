import { useEffect, useState } from 'react';
import ProductItem from './productItem';

const Productslist = () => {
    const [prodotti, setProdotti] = useState([])

    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URI}/api/products`, {
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
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Prodotti Disponibili</h2>
        {prodotti && prodotti.map((prod) => <ProductItem prodotto={prod} /> ) }
      </div>
    </div>
  )
}

export default Productslist