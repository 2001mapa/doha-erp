"use client";
import React, { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function ConceptosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto w-full text-[#472825] min-h-screen bg-[#fdfbf9]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#472825]">Conceptos de Cartera</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#D3AB80] text-white px-4 py-2 rounded-lg hover:bg-[#b8956e] transition-colors"
        >
          <Plus size={20} />
          <span>Nuevo Concepto</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-[#472825]">Nombre del Concepto</th>
              <th className="px-6 py-4 font-semibold text-[#472825]">Tipo</th>
              <th className="px-6 py-4 font-semibold text-[#472825]">Estado</th>
              <th className="px-6 py-4 font-semibold text-[#472825] text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            <tr className="hover:bg-zinc-50 transition-colors">
              <td className="px-6 py-4 text-sm">Abono Factura</td>
              <td className="px-6 py-4 text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Ingreso
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Activo
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-right">
                <button className="text-zinc-400 hover:text-[#D3AB80] p-1 transition-colors">
                  <Edit2 size={16} />
                </button>
                <button className="text-zinc-400 hover:text-red-500 p-1 ml-2 transition-colors">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-zinc-50 transition-colors">
              <td className="px-6 py-4 text-sm">Devolución</td>
              <td className="px-6 py-4 text-sm">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                  Egreso
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Activo
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-right">
                <button className="text-zinc-400 hover:text-[#D3AB80] p-1 transition-colors">
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
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#472825]">Nuevo Concepto</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Nombre del Concepto
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all"
                  placeholder="Ej. Abono Factura"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Tipo
                </label>
                <select className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all">
                  <option value="">Seleccione un tipo</option>
                  <option value="ingreso">Ingreso</option>
                  <option value="egreso">Egreso</option>
                </select>
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
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
