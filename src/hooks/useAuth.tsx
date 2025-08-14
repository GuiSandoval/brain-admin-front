"use client";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { getCurrentUser, UserData, logout } from "@/utils/auth";

interface AuthContextData {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => void;
  updateUser: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = () => {
    const userData = getCurrentUser();
    setUser(userData);
  };

  useEffect(() => {
    updateUser();
    setIsLoading(false);
  }, []);

  const signOut = () => {
    setUser(null);
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
