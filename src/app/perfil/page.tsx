"use client";

import { LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const mockPedidos = [
  { id: "PED-001", fecha: "2026-03-15", total: 150000, estado: "Entregado", items: "1x Cadena Mónaco Oro Laminado 18k" },
  { id: "PED-002", fecha: "2026-04-01", total: 85000, estado: "En Camino", items: "1x Pulsera Esclava" },
];

export default function PerfilPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Aquí iría la lógica para limpiar la sesión
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-[#472825] p-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <UserCircle className="w-16 h-16 text-[#D3AB80]" />
            <h1 className="text-3xl font-semibold">Hola, Cliente Prueba</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna Izquierda: Mis Datos */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[#fdfbf9]">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Mis Datos</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Nombre</label>
                  <p className="font-medium">Cliente Prueba</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Correo</label>
                  <p className="font-medium">cliente@prueba.com</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Teléfono</label>
                  <p className="font-medium">+1 234 567 8900</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Historial de Pedidos */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[#fdfbf9]">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Historial de Pedidos</h2>
              {mockPedidos.length > 0 ? (
                <div className="space-y-4">
                  {mockPedidos.map((pedido) => (
                    <div key={pedido.id} className="border border-gray-100 p-4 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold text-lg block">{pedido.id}</span>
                          <span className="text-sm text-gray-500">{pedido.fecha}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          pedido.estado === "Entregado" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {pedido.estado}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Artículos:</span> {pedido.items}
                      </div>
                      <div className="text-right font-semibold text-[#D3AB80]">
                        ${pedido.total.toLocaleString("es-CO")}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No tienes pedidos anteriores.</p>
              )}
            </div>
          </div>
        </div>

        {/* Botón de acción inferior */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="bg-[#D3AB80] text-white px-8 py-3 rounded-md font-medium hover:bg-[#c2986f] transition-colors"
          >
            Ir a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
