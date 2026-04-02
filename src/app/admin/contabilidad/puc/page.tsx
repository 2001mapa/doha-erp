"use client";
import { useState } from "react";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";

export default function PucPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full min-h-screen" style={{ backgroundColor: "#fdfbf9", color: "#472825" }}>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black mb-1">Plan Único de Cuentas (PUC)</h1>
          <p className="text-sm opacity-80">Catálogo de cuentas contables del sistema.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full md:w-auto"
        >
          <Plus size={20} />
          <span>Agregar Cuenta</span>
        </button>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por código o nombre..."
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
                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Código de Cuenta</th>
                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Nombre de Cuenta</th>
                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Tipo</th>
                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Estado</th>
                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {/* Ejemplo de datos pre-cargados para darle vista */}
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="py-4 px-6 text-sm font-medium">110505</td>
                <td className="py-4 px-6 text-sm">Caja General</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    Activo
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Activo
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-zinc-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <h2 className="text-xl font-bold" style={{ color: "#472825" }}>Agregar Cuenta</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-200 text-zinc-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Código de Cuenta</label>
                  <input
                    type="text"
                    placeholder="Ej. 110505"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Nombre de Cuenta</label>
                  <input
                    type="text"
                    placeholder="Ej. Caja General"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Tipo de Cuenta</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm appearance-none"
                  >
                    <option value="">Seleccionar tipo...</option>
                    <option value="activo">Activo</option>
                    <option value="pasivo">Pasivo</option>
                    <option value="patrimonio">Patrimonio</option>
                    <option value="ingresos">Ingresos</option>
                    <option value="gastos">Gastos</option>
                    <option value="costos">Costos de Venta</option>
                  </select>
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
                Guardar Cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
