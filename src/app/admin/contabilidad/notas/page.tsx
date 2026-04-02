"use client";
import { useState } from "react";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";

export default function NotasContablesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full min-h-screen" style={{ backgroundColor: "#fdfbf9", color: "#472825" }}>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black mb-1">Notas Contables</h1>
          <p className="text-sm opacity-80">Gestión de ajustes y notas en el sistema contable.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full md:w-auto"
        >
          <Plus size={20} />
          <span>Nueva Nota</span>
        </button>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por referencia o concepto..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-100">
                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Fecha</th>
                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Referencia</th>
                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Concepto</th>
                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Valor Total</th>
                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {/* Ejemplo de fila vacía/estado inicial */}
              <tr>
                <td colSpan={5} className="py-12 text-center text-zinc-400 text-sm">
                  No hay notas contables registradas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-zinc-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <h2 className="text-xl font-bold" style={{ color: "#472825" }}>Nueva Nota Contable</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-200 text-zinc-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <form className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Fecha</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Referencia</label>
                  <input
                    type="text"
                    placeholder="Ej. NC-1001"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Descripción / Concepto</label>
                  <textarea
                    rows={3}
                    placeholder="Detalle de la nota contable..."
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Valor Total</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">$</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-zinc-600 hover:bg-zinc-200 transition-colors"
              >
                Cancelar
              </button>
              <button className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Guardar Nota
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
