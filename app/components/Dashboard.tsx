import { useAuth } from '../contexts/AuthContext';
import Navbar from './dashboardComponents/navbar';
import ProductItem from './dashboardComponents/productItem';

export default function Dashboard() {
    const cipolla = {
      nome: "cipolla",
      prezzo: "40",
      descrizione: "mangiare",
      immagine: "image.png"
    }
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
        </div>
      </div>
    </div>
  );
} 