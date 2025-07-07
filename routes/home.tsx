import type { Route } from "../app/types/home";
import { AuthProvider } from "../app/contexts/AuthContext";
import LandingPage from "../app/components/LandingPage";
import Dashboard from "../app/components/Dashboard";
import { useAuth } from "../app/contexts/AuthContext";
import Login from "~/components/Login";
import Register from "~/components/Register";
import NewProducts from "../app/components/dashboardComponents/newProducts";
import { CookiesProvider } from "react-cookie";

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
      <LandingPage />
    )
  );
}


//funzione per il componente Home
export default function Home() {
  return (
    <CookiesProvider >
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
    </CookiesProvider>
  );
}
