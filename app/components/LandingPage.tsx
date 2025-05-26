import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <div className="max-w-2xl text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6">Benvenuto in SupermercatoSMART</h1>
        <p className="text-lg mb-8 ">
          Accedi per accedere a tutte le funzionalità della nostra piattaforma
        </p>
        <button
          onClick={login}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Accedi
        </button>
      </div>
    </div>
  );
} 