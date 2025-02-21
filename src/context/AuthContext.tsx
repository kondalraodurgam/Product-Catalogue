import React, { createContext, useContext, useState } from 'react';

interface User {
  firstName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getUserFromStorage = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return null;
      return JSON.parse(storedUser);
    } catch {
      return null; // Handle legacy non-JSON stored values
    }
  };

  const [user, setUser] = useState<User | null>(getUserFromStorage());

  const login = (email: string) => {
    const userData: User = { firstName: email.split('@')[0], email };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
