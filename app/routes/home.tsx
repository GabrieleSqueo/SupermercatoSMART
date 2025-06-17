import type { Route } from "../types/home";
import { AuthProvider } from "../contexts/AuthContext";
import LandingPage from "../components/LandingPage";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../contexts/AuthContext";
import Login from "~/components/Login";
import Register from "~/components/Register";
import NewProducts from "../components/dashboardComponents/newProducts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SupermercatoSMART" },
    { name: "description", content: "La tua piattaforma per la spesa intelligente" },
  ];
}

// Funzione per il contenuto della home
function HomeContent() {
  const { isAuthenticated, isLogging, isRegistering } = useAuth();

  return (
    isLogging ? (
      <Login />
    ) : isRegistering ? (
      <Register />
    ) : isAuthenticated ? (
      <Dashboard />
    ) : (
      <NewProducts />
    )
  );
}


//funzione per il componente Home
export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}
