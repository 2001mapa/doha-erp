"use client";

import { Search, CircleDollarSign } from "lucide-react";

export default function CostoProductoPage() {
  return (
    <div className="p-8 bg-[#fdfbf9] min-h-screen text-[#472825]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent flex items-center gap-3">
            <CircleDollarSign size={32} className="text-amber-500" />
            Costo de Producto
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Análisis de costos, precios de venta y márgenes
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
              placeholder="Buscar producto..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Producto</th>
                <th className="px-6 py-4 font-semibold">Costo Promedio</th>
                <th className="px-6 py-4 font-semibold">Último Costo de Compra</th>
                <th className="px-6 py-4 font-semibold">Precio de Venta Actual</th>
                <th className="px-6 py-4 font-semibold">Margen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 font-medium">Anillo de Compromiso Oro 18k</td>
                <td className="px-6 py-4 font-medium text-zinc-600">$ 1,200,000</td>
                <td className="px-6 py-4 font-medium text-zinc-600">$ 1,250,000</td>
                <td className="px-6 py-4 font-medium text-amber-600">$ 2,500,000</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">
                    52%
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 font-medium">Cadena Oro 18k 50cm</td>
                <td className="px-6 py-4 font-medium text-zinc-600">$ 800,000</td>
                <td className="px-6 py-4 font-medium text-zinc-600">$ 800,000</td>
                <td className="px-6 py-4 font-medium text-amber-600">$ 1,500,000</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">
                    46.6%
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
