"use client";

import { Search, Undo2 } from "lucide-react";

export default function DevolucionesPage() {
  return (
    <div className="p-8 bg-[#fdfbf9] min-h-screen text-[#472825]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent flex items-center gap-3">
            <Undo2 size={32} className="text-amber-500" />
            Devoluciones
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Registro de devoluciones por garantía o defecto
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="p-4 border-b border-zinc-100 flex items-center gap-4 bg-zinc-50/50">
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Buscar devolución..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Fecha</th>
                <th className="px-6 py-4 font-semibold">Cliente/Proveedor</th>
                <th className="px-6 py-4 font-semibold">Producto</th>
                <th className="px-6 py-4 font-semibold">Cantidad</th>
                <th className="px-6 py-4 font-semibold">Motivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 text-zinc-500">2023-10-28</td>
                <td className="px-6 py-4 font-medium">María González</td>
                <td className="px-6 py-4">Anillo de Compromiso Oro 18k</td>
                <td className="px-6 py-4 font-medium">1</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700">
                    Garantía
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 text-zinc-500">2023-10-29</td>
                <td className="px-6 py-4 font-medium">Joyería Mayorista S.A.</td>
                <td className="px-6 py-4">Cadena Oro 18k 50cm</td>
                <td className="px-6 py-4 font-medium">3</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-700">
                    Defecto
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
