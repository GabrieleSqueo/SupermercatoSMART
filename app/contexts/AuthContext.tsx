import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

//definizione della variabile e delle funzioni
interface AuthContextType {
  isAuthenticated: boolean;
  isLogging: boolean;
  isRegistering:boolean;
  login: () => void;  
  logout: () => void;
  authenticated: () => void;
  register:()=>void;
  registered: () => void;
}

//definizione del contesto: AuthContext è il nome, e AuthContextType è il tipo
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogging, setIsLogging] = useState(false)
  const  [isRegistering, setIsRegistering]=useState(false)

  //funzione per il login
  const login = () => {
    setIsLogging(true);
  };

  const authenticated = () => {
    setIsAuthenticated(true);
    setIsLogging(false)
  }

  //funzione per il logout
  const logout = () => {
    setIsAuthenticated(false);
  };

   //funzione per il register
  const register = () => {
     setIsRegistering(true); 
    setIsLogging(false);
  };

const registered = () => {
  setIsAuthenticated(true);
  setIsRegistering(false);
};
  return (
    <AuthContext.Provider value={{ isAuthenticated, isLogging, isRegistering,login, logout, register, authenticated, registered }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 