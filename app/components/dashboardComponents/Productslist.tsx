import { useEffect, useState } from 'react';
import ProductItem from './productItem';

const Productslist = () => {
    const [prodotti, setProdotti] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URI}/api/products`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })

        if (!res.ok) { 
          
          throw new Error("Errore nei prodotti");
        }
        setLoading(false);
        const data = await res.json();
        setProdotti(data);
      } catch (error) {
        setLoading(false);
        console.error("Errore:", error);
      }
    }

    fetchProducts();
  }, []); 
  return (
    <div className="w-full">
      
      <h2 className="flex text-2xl font-bold text-blue-700 mb-6 justify-center">Lista Prodotti</h2>  
      <div className="space-y-6">
        {loading && <p className="text-center text-blue-500">Caricamento prodotti...</p>}
        {!loading && prodotti && prodotti.map((prod) => <ProductItem prodotto={prod} /> ) }
      </div>
    </div>
  )
}

export default Productslist