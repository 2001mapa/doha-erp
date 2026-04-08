"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export type AdminRole = "Administrador" | "Supervisor" | "Vendedor";

export interface AdminUser {
  nombre: string;
  rol: AdminRole;
  permisos?: string[];
}

interface AdminAuthContextType {
  user: AdminUser | null;
  login: (usuario: string, clave: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permiso: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

import { supabase } from "../lib/supabaseClient";

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const router = useRouter();

  const login = async (usuario: string, clave: string): Promise<boolean> => {
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
      let userPermisos: string[] = [];
      try {
        const { data: roleData } = await supabase
          .from('roles')
          .select('id')
          .eq('nombre', role)
          .single();

        if (roleData) {
          const { data: permisosData } = await supabase
            .from('permisos_rol')
            .select('permisos(nombre)')
            .eq('rol_id', roleData.id);

          if (permisosData) {
            userPermisos = permisosData
              .map((p: any) /* eslint-disable-line @typescript-eslint/no-explicit-any */ => p.permisos?.nombre)
              .filter(Boolean) as string[];
          }
        }
      } catch (err) {
        console.error("Error fetching permissions:", err);
      }

      setUser({ nombre, rol: role, permisos: userPermisos });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    router.push("/admin/login");
  };

  const hasPermission = (permiso: string): boolean => {
    if (!user) return false;
    if (user.rol === "Administrador") return true;
    return user.permisos?.includes(permiso) || false;
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, logout, hasPermission }}>
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
