import { useEffect, useState } from 'react';
import Navbar from './dashboardComponents/navbar';
import ProductItem from './dashboardComponents/productItem';

export default function Dashboard() {
  const [prodotti, setProdotti] = useState([])
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products", {
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
    <div className="min-h-screen bg-gray-100 p-8 text-black">
    
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Navbar />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Prodotti in Offerta</h2>
              <p>Visualizza le offerte del giorno</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Lista della Spesa</h2>
              <p>Gestisci la tua lista della spesa</p>
            </div>
          </div>
          {prodotti.map((prod) => 
            <ProductItem prodotto={prod} />
          )}
        </div>
      </div>
    </div>
  );
} 