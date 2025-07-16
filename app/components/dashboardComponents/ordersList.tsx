import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import PopupMessage from './PopupMessage';

interface Order {
  id: string;
  prodottiComprati: string;
  costo: number;
  data: string;
  userId: string;
}

const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies, setCookie] = useCookies(['AccessToken', 'utente', 'refreshToken']);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (retry = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${import.meta.env.VITE_API_URI}/api/retrieveOrders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookies.AccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: cookies.refreshToken })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOrders(data.orders);
      } else if (response.status === 401 && data.accessToken && !retry) {
        // Token scaduto, aggiorna e riprova
        setCookie('AccessToken', data.accessToken, { path: '/' });
        setPopupMessage('Sessione scaduta: access token rinnovato. Ordini aggiornati.');
        await fetchOrders(true); // Riprova una sola volta
      } else {
        setError(data.message || 'Errore nel recupero degli ordini');
        if (data.message) setPopupMessage(data.message);
      }
    } catch (err) {
      setError('Errore di connessione');
      setPopupMessage('Errore di connessione');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchOrders = () => { fetchOrders(); };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return `€${price.toFixed(2)}`;
  };

  const getOrderStatus = (order: Order) => {
    const orderDate = new Date(order.data);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return { text: 'Oggi', color: 'bg-green-100 text-green-800' };
    if (diffDays === 1) return { text: 'Ieri', color: 'bg-blue-100 text-blue-800' };
    if (diffDays < 7) return { text: `${diffDays} giorni fa`, color: 'bg-yellow-100 text-yellow-800' };
    return { text: formatDate(order.data), color: 'bg-gray-100 text-gray-800' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">Caricamento ordini...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Errore di Connessione</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={handleFetchOrders}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Riprova
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {popupMessage && (
        <PopupMessage message={popupMessage} onClose={() => setPopupMessage(null)} />
      )}
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              I Tuoi Ordini
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Storico completo dei tuoi acquisti con tutti i dettagli
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Ordini completati</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Totale: {orders.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Nessun ordine trovato</h3>
              <p className="text-gray-600 mb-6">Non hai ancora effettuato nessun ordine. Inizia a fare shopping!</p>
              <button 
                onClick={handleFetchOrders}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Aggiorna Lista
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {orders.map((order, index) => {
                const status = getOrderStatus(order);
                return (
                  <div 
                    key={order.id} 
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold">
                            Ordine #{order.id.slice(-8).toUpperCase()}
                          </h3>
                          <p className="text-blue-100 text-sm">
                            {formatDate(order.data)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {formatPrice(order.costo)}
                          </p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.text}
                          </span>
                        </div>
                      </div>
                    </div>

                    
                    <div className="p-6">
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Prodotti acquistati
                        </h4>
                            <div className="bg-gray-50 rounded-xl p-4 max-h-32 overflow-y-auto">
                              <div className="text-gray-700 text-sm leading-relaxed">
                             {(() => {
                               try {
                                 const prodotti = JSON.parse(order.prodottiComprati);
                                 return Array.isArray(prodotti) ? (
                                   <div className="space-y-2">
                                     {prodotti.map((prodotto, idx) => (
                                       <div key={idx} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                                         <span className="font-medium">{prodotto.nome}</span>
                                         <span className="text-blue-600 font-semibold">x{prodotto.quantità}</span>
                                       </div>
                                     ))}
                                   </div>
                                 ) : (
                                   <div className="text-gray-600">{order.prodottiComprati}</div>
                                 );
                               } catch (error) {
                                 return <div className="text-gray-600">{order.prodottiComprati}</div>;
                               }
                             })()}
                           </div>
                         </div>
                      </div>

                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-green-600 font-medium">Completato</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {order.id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{orders.length}</div>
                  <div className="text-gray-600">Totale Ordini</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {formatPrice(orders.reduce((sum, order) => sum + order.costo, 0))}
                  </div>
                  <div className="text-gray-600">Spesa Totale</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {formatPrice(orders.reduce((sum, order) => sum + order.costo, 0) / orders.length)}
                  </div>
                  <div className="text-gray-600">Media per Ordine</div>
                </div>
              </div>
            </div>

            
            <div className="text-center pt-6">
              <button 
                onClick={handleFetchOrders}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Aggiorna Lista
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;