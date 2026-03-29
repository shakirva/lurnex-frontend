"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiService } from "@/lib/api";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'user' | 'employer';
  company_name?: string;
  phone?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<any>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (password: string, token: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (authToken && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Attempting login for:', username);
      
      const response = await apiService.login(username, password);
      console.log('🔐 Login response:', response);
      
      if (response.success && response.data) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        setIsAuthenticated(true);
        setUser(response.data.user);
        console.log('✅ Login successful!');
        return true;
      }
      
      console.log('❌ Login failed:', response.message);
      return false;
    } catch (error) {
      console.error('❌ Login error:', error);
      return false;
    }
  };

  const register = async (userData: any): Promise<any> => {
    try {
      const response = await apiService.register(userData);
      if (response.success && response.data) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        setIsAuthenticated(true);
        setUser(response.data.user as any);
      }
      return response;
    } catch (error: any) {
      console.error('Registration error:', error);
      return { success: false, message: error.message || 'An error occurred during registration' };
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      const response = await apiService.forgotPassword(email);
      return response.success;
    } catch (error) {
      console.error('Forgot password error:', error);
      return false;
    }
  };

  const resetPassword = async (password: string, token: string): Promise<boolean> => {
    try {
      const response = await apiService.resetPassword(password, token);
      return response.success;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, forgotPassword, resetPassword, logout, loading }}>
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
