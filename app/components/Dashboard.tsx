import Navbar from './dashboardComponents/navbar';
import PaginaCarrello from "./dashboardComponents/PaginaCarrello"
import { useAuth } from '~/contexts/AuthContext';
import Productslist from './dashboardComponents/Productslist';
import NewProducts from './dashboardComponents/newProducts';

export default function Dashboard() {
  
  const {isCheckingCarrello, isAddingProduct} = useAuth()

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
    
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Navbar />
          {isCheckingCarrello && <PaginaCarrello />}
          {isAddingProduct  && <NewProducts /> }
          {!isCheckingCarrello && !isAddingProduct && <Productslist />}
              
        </div>
      </div>
    </div>
  );
} 