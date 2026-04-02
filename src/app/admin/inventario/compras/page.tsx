"use client";

import { useState } from "react";
import { Plus, Search, FileText, X } from "lucide-react";

export default function ComprasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 bg-[#fdfbf9] min-h-screen text-[#472825]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
            Compras
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Gestión de ingreso de mercancía
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
        >
          <Plus size={20} />
          Nueva Compra
        </button>
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
              placeholder="Buscar por proveedor o número de factura..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Fecha</th>
                <th className="px-6 py-4 font-semibold">Proveedor</th>
                <th className="px-6 py-4 font-semibold">Factura Nro</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {/* Filas vacías por ahora */}
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 text-zinc-500">2023-10-27</td>
                <td className="px-6 py-4 font-medium">Joyería Mayorista S.A.</td>
                <td className="px-6 py-4 font-mono text-xs">INV-2023-001</td>
                <td className="px-6 py-4 font-medium text-amber-600">$ 4,500,000</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">
                    Completado
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-[#fdfbf9]">
              <h2 className="text-xl font-bold text-[#472825] flex items-center gap-2">
                <FileText className="text-amber-500" size={24} />
                Registrar Nueva Compra
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <form className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-zinc-700">
                    Proveedor
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Joyería Mayorista S.A."
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-zinc-700">
                    Fecha de Ingreso
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5 col-span-2">
                  <label className="text-sm font-semibold text-zinc-700">
                    Número de Factura
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: INV-2023-001"
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5 col-span-2 mt-4">
                  <h3 className="text-sm font-bold text-[#472825] border-b border-zinc-100 pb-2 mb-2">
                    Productos Ingresados
                  </h3>
                  {/* Aquí iría un sub-formulario o tabla para agregar productos. Por ahora un textarea para la idea */}
                  <textarea
                    rows={4}
                    placeholder="Detalle los productos ingresados..."
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                  />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl font-semibold text-zinc-600 hover:bg-zinc-200 transition-colors"
              >
                Cancelar
              </button>
              <button className="px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                Guardar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
