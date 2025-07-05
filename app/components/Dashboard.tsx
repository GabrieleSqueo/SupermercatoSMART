import Navbar from './dashboardComponents/navbar';
import PaginaCarrello from "./dashboardComponents/PaginaCarrello"
import { useAuth } from '~/contexts/AuthContext';
import Productslist from './dashboardComponents/ProductsList';
import NewProducts from './dashboardComponents/newProducts';
import OrdersList from './dashboardComponents/ordersList';

export default function Dashboard() {
  
  const {isCheckingCarrello, isAddingProduct, isRetrievingOrders} = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 p-6 md:p-12 text-black flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-6 md:p-10">
          <Navbar />
          <div className="mt-6">
            {isCheckingCarrello && <PaginaCarrello />}
            {isAddingProduct  && <NewProducts /> }
            {isRetrievingOrders && <OrdersList />}
            {!isCheckingCarrello && !isAddingProduct && !isRetrievingOrders && <Productslist />}
            
          </div>
        </div>
      </div>
    </div>
  );
} 