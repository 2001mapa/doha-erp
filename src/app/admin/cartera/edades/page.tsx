import React from "react";

export default function EdadesCarteraPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full text-[#472825] min-h-screen bg-[#fdfbf9]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#472825]">Edades de Cartera</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-[#472825]">Cliente</th>
              <th className="px-6 py-4 font-semibold text-[#472825]">Total Deuda</th>
              <th className="px-6 py-4 font-semibold text-[#472825]">Al día</th>
              <th className="px-6 py-4 font-semibold text-[#472825]">1-30 días</th>
              <th className="px-6 py-4 font-semibold text-[#472825]">31-60 días</th>
              <th className="px-6 py-4 font-semibold text-[#472825]">61-90 días</th>
              <th className="px-6 py-4 font-semibold text-[#472825]">Mayor a 90 días</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            <tr className="hover:bg-zinc-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium">Joyería El Diamante</td>
              <td className="px-6 py-4 text-sm font-bold">$12,500,000</td>
              <td className="px-6 py-4 text-sm text-green-600">$5,000,000</td>
              <td className="px-6 py-4 text-sm text-yellow-600">$7,500,000</td>
              <td className="px-6 py-4 text-sm text-zinc-400">$0</td>
              <td className="px-6 py-4 text-sm text-zinc-400">$0</td>
              <td className="px-6 py-4 text-sm text-zinc-400">$0</td>
            </tr>
            <tr className="hover:bg-zinc-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium">Distribuidora Oro Fino</td>
              <td className="px-6 py-4 text-sm font-bold">$8,200,000</td>
              <td className="px-6 py-4 text-sm text-green-600">$2,000,000</td>
              <td className="px-6 py-4 text-sm text-yellow-600">$1,000,000</td>
              <td className="px-6 py-4 text-sm text-orange-500">$2,000,000</td>
              <td className="px-6 py-4 text-sm text-red-500">$1,200,000</td>
              <td className="px-6 py-4 text-sm font-bold text-red-600 bg-red-50">$2,000,000</td>
            </tr>
            <tr className="hover:bg-zinc-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium">Accesorios La Perla</td>
              <td className="px-6 py-4 text-sm font-bold">$4,800,000</td>
              <td className="px-6 py-4 text-sm text-green-600">$4,800,000</td>
              <td className="px-6 py-4 text-sm text-zinc-400">$0</td>
              <td className="px-6 py-4 text-sm text-zinc-400">$0</td>
              <td className="px-6 py-4 text-sm text-zinc-400">$0</td>
              <td className="px-6 py-4 text-sm text-zinc-400">$0</td>
            </tr>
            <tr className="bg-zinc-50 font-bold border-t-2 border-zinc-200">
              <td className="px-6 py-4 text-sm">Totales</td>
              <td className="px-6 py-4 text-sm">$25,500,000</td>
              <td className="px-6 py-4 text-sm text-green-600">$11,800,000</td>
              <td className="px-6 py-4 text-sm text-yellow-600">$8,500,000</td>
              <td className="px-6 py-4 text-sm text-orange-500">$2,000,000</td>
              <td className="px-6 py-4 text-sm text-red-500">$1,200,000</td>
              <td className="px-6 py-4 text-sm text-red-600 bg-red-50">$2,000,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
