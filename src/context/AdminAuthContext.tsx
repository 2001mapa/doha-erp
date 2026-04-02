"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export type AdminRole = "Administrador" | "Supervisor" | "Vendedor";

export interface AdminUser {
  nombre: string;
  rol: AdminRole;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  login: (usuario: string, clave: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const router = useRouter();

  const login = (usuario: string, clave: string): boolean => {
    if (clave !== "1234") return false;

    let role: AdminRole | null = null;
    let nombre = "";

    if (usuario === "admin") {
      role = "Administrador";
      nombre = "Admin Principal";
    } else if (usuario === "supervisor") {
      role = "Supervisor";
      nombre = "Supervisor de Tienda";
    } else if (usuario === "vendedor") {
      role = "Vendedor";
      nombre = "Vendedor de Mostrador";
    }

    if (role) {
      setUser({ nombre, rol: role });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    router.push("/admin/login");
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
