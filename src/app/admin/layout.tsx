"use client";

import { usePathname } from "next/navigation";
import { DohaSidebar } from "../../components/Sidebar"; // Ajusta los puntitos si te marca error la ruta
import { AdminAuthProvider } from "../../context/AdminAuthContext";
import { AdminGuard } from "../../components/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <AdminAuthProvider>
      <AdminGuard>
        <div className="relative min-h-screen bg-[#fdfbf9]">
          {!isLoginPage && <DohaSidebar />}

          {/* Contenedor Principal al 100% de ancho */}
          <main className={`w-full min-h-screen overflow-y-auto ${isLoginPage ? '' : ''}`}>{children}</main>
        </div>
      </AdminGuard>
    </AdminAuthProvider>
  );
}
