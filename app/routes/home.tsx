import type { Route } from "../types/home";
import { AuthProvider } from "../contexts/AuthContext";
import LandingPage from "../components/LandingPage";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../contexts/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SupermercatoSMART" },
    { name: "description", content: "La tua piattaforma per la spesa intelligente" },
  ];
}

function HomeContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <LandingPage />;
}

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}
