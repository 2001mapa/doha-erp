"use client";
import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, Eye } from "lucide-react";

export default function RecibosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto w-full text-[#472825] min-h-screen bg-[#fdfbf9]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#472825]">Recibos de Caja</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#D3AB80] text-white px-4 py-2 rounded-lg hover:bg-[#b8956e] transition-colors"
        >
          <Plus size={20} />
          <span>Nuevo Recibo</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-[#472825]">Nro. Recibo</th>
              <th className="px-6 py-4 font-semibold text-[#472825]">Fecha</th>
              <th className="px-6 py-4 font-semibold text-[#472825]">Cliente</th>
              <th className="px-6 py-4 font-semibold text-[#472825]">Valor Recibido</th>
              <th className="px-6 py-4 font-semibold text-[#472825] text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            <tr className="hover:bg-zinc-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium">RC-001</td>
              <td className="px-6 py-4 text-sm">2023-10-25</td>
              <td className="px-6 py-4 text-sm">Joyería El Diamante</td>
              <td className="px-6 py-4 text-sm font-semibold">$1,500,000</td>
              <td className="px-6 py-4 text-sm text-right">
                <button className="text-zinc-400 hover:text-blue-500 p-1 transition-colors" title="Ver detalles">
                  <Eye size={16} />
                </button>
                <button className="text-zinc-400 hover:text-[#D3AB80] p-1 ml-2 transition-colors">
                  <Edit2 size={16} />
                </button>
                <button className="text-zinc-400 hover:text-red-500 p-1 ml-2 transition-colors">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-zinc-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium">RC-002</td>
              <td className="px-6 py-4 text-sm">2023-10-26</td>
              <td className="px-6 py-4 text-sm">Distribuidora Oro Fino</td>
              <td className="px-6 py-4 text-sm font-semibold">$3,200,000</td>
              <td className="px-6 py-4 text-sm text-right">
                <button className="text-zinc-400 hover:text-blue-500 p-1 transition-colors" title="Ver detalles">
                  <Eye size={16} />
                </button>
                <button className="text-zinc-400 hover:text-[#D3AB80] p-1 ml-2 transition-colors">
                  <Edit2 size={16} />
                </button>
                <button className="text-zinc-400 hover:text-red-500 p-1 ml-2 transition-colors">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#472825]">Nuevo Recibo de Caja</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Cliente
                </label>
                <select className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all">
                  <option value="">Seleccione un cliente</option>
                  <option value="1">Joyería El Diamante</option>
                  <option value="2">Distribuidora Oro Fino</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Concepto
                </label>
                <select className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all">
                  <option value="">Seleccione un concepto</option>
                  <option value="1">Abono Factura</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Forma de Pago
                </label>
                <select className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all">
                  <option value="">Seleccione forma de pago</option>
                  <option value="1">Transferencia Bancolombia</option>
                  <option value="2">Efectivo Caja General</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Valor Recibido
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all"
                  placeholder="Ej. 1500000"
                />
              </div>

              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D3AB80] text-white rounded-lg hover:bg-[#b8956e] transition-colors"
                >
                  Guardar Recibo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
