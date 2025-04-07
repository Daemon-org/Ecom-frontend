import React, { useState, createContext, useContext } from 'react';
// Types
interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}
// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Provider component
export const AuthProvider: React.FC<{
  children: ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      // Mock authentication logic
      if (email === 'admin@example.com' && password === 'admin123') {
        setUser({
          id: 'admin1',
          name: 'Admin User',
          email: 'admin@example.com',
          isAdmin: true
        });
        return true;
      } else if (email === 'user@example.com' && password === 'user123') {
        setUser({
          id: 'user1',
          name: 'Regular User',
          email: 'user@example.com',
          isAdmin: false
        });
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (err) {
      setError('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      // Mock registration logic
      if (email === 'admin@example.com' || email === 'user@example.com') {
        setError('Email already in use');
        return false;
      }
      // Create new user
      setUser({
        id: `user${Date.now()}`,
        name,
        email,
        isAdmin: false
      });
      return true;
    } catch (err) {
      setError('An error occurred during registration');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  // Logout function
  const logout = () => {
    setUser(null);
  };
  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
    error
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};