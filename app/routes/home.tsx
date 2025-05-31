import type { Route } from "../types/home";
import { AuthProvider } from "../contexts/AuthContext";
import LandingPage from "../components/LandingPage";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../contexts/AuthContext";
import Login from "~/components/Login";
import Register from "~/components/Register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SupermercatoSMART" },
    { name: "description", content: "La tua piattaforma per la spesa intelligente" },
  ];
}
//funzione per il contenuto della home  
function HomeContent() {

  const { isAuthenticated, isLogging } = useAuth();
  return (
    isLogging ? <Register /> :
    isAuthenticated ? <Dashboard /> : <LandingPage />
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
