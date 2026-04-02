"use client";

import { FileSpreadsheet, Search, Calendar, Filter } from "lucide-react";

export default function KardexPage() {
  return (
    <div className="p-8 bg-[#fdfbf9] min-h-screen text-[#472825]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent flex items-center gap-3">
            <FileSpreadsheet size={32} className="text-amber-500" />
            Kardex
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Historial de movimientos de inventario por producto
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden mb-6 p-6">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Producto
            </label>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                placeholder="Buscar por código o nombre..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
              />
            </div>
          </div>
          <div className="w-48">
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Fecha Inicial
            </label>
            <div className="relative">
              <Calendar
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
              />
            </div>
          </div>
          <div className="w-48">
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Fecha Final
            </label>
            <div className="relative">
              <Calendar
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
              />
            </div>
          </div>
          <button className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 rounded-xl hover:bg-zinc-800 transition-all font-semibold">
            <Filter size={18} />
            Filtrar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="p-4 border-b border-zinc-100 bg-amber-50/50 flex justify-between items-center">
          <h2 className="font-bold text-amber-900">
            Movimientos: Anillo de Compromiso Oro 18k
          </h2>
          <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            Saldo Actual: 15 unds
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Fecha</th>
                <th className="px-6 py-4 font-semibold">Concepto</th>
                <th className="px-6 py-4 font-semibold">Documento</th>
                <th className="px-6 py-4 font-semibold text-center text-emerald-600 bg-emerald-50/30">
                  Entradas
                </th>
                <th className="px-6 py-4 font-semibold text-center text-red-600 bg-red-50/30">
                  Salidas
                </th>
                <th className="px-6 py-4 font-semibold text-right text-amber-600 bg-amber-50/30">
                  Saldo Final
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 text-zinc-500">2023-10-25 10:30</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">
                    Compra
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-zinc-500">INV-001</td>
                <td className="px-6 py-4 font-bold text-center text-emerald-600 bg-emerald-50/10">
                  20
                </td>
                <td className="px-6 py-4 text-center text-zinc-400 bg-red-50/10">
                  -
                </td>
                <td className="px-6 py-4 font-bold text-right text-amber-700 bg-amber-50/10">
                  20
                </td>
              </tr>
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 text-zinc-500">2023-10-26 15:45</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700">
                    Venta
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-zinc-500">POS-1042</td>
                <td className="px-6 py-4 text-center text-zinc-400 bg-emerald-50/10">
                  -
                </td>
                <td className="px-6 py-4 font-bold text-center text-red-600 bg-red-50/10">
                  5
                </td>
                <td className="px-6 py-4 font-bold text-right text-amber-700 bg-amber-50/10">
                  15
                </td>
              </tr>
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 text-zinc-500">2023-10-28 09:15</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700">
                    Devolución
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-zinc-500">DEV-089</td>
                <td className="px-6 py-4 font-bold text-center text-emerald-600 bg-emerald-50/10">
                  1
                </td>
                <td className="px-6 py-4 text-center text-zinc-400 bg-red-50/10">
                  -
                </td>
                <td className="px-6 py-4 font-bold text-right text-amber-700 bg-amber-50/10">
                  16
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
