import { DohaSidebar } from "../../components/Sidebar"; // Ajusta los puntitos si te marca error la ruta

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#fdfbf9]">
      <DohaSidebar />

      {/* Contenedor Principal al 100% de ancho */}
      <main className="w-full min-h-screen overflow-y-auto">{children}</main>
    </div>
  );
}
