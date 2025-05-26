import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

//definizione della variabile e delle funzioni
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

//definizione del contesto: AuthContext è il nome, e AuthContextType è il tipo
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //funzione per il login
  const login = () => {
    setIsAuthenticated(true);
  };

  //funzione per il logout
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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