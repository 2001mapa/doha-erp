"use client";

import { useState } from "react";
import { Search, Undo2, FileSpreadsheet, Trash2, Edit, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DevolucionesPage() {
  const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [mockData, setMockData] = useState([
    {
      id: 1,
      documento: "DC-001",
      fecha: "04/04/2026",
      nit: "900987654",
      tercero: "PROVEEDORES EL POBLADO SAS",
      subtotal: 450000,
      descuento: 0,
      impuesto: 0,
      total: 450000,
      estado: "Aplicado",
    },
    {
      id: 2,
      documento: "DC-002",
      fecha: "05/04/2026",
      nit: "900123456",
      tercero: "JOYERÍA CENTRAL",
      subtotal: 120000,
      descuento: 5000,
      impuesto: 0,
      total: 115000,
      estado: "Pendiente",
    },
  ]);

  const handleDelete = (id: number) => {
    setMockData(mockData.filter((item) => item.id !== id));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsMainModalOpen(true);
  };

  const handleExcel = () => {
    console.log("Simulating Excel download");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#fdfbf9] min-h-screen text-[#472825]">
      {/* Header & Top Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent flex items-center gap-3">
            <Undo2 size={32} className="text-amber-500" />
            Devoluciones
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Registro de devoluciones por garantía o defecto
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMiniModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all font-semibold"
          >
            <Undo2 size={20} />
            Nueva Devolución
          </button>

          <button
            onClick={handleExcel}
            className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors font-medium"
            title="Descargar listado a excel"
          >
            <FileSpreadsheet size={20} className="text-emerald-600" />
            Excel
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5 mb-6">
        <h2 className="text-sm font-bold text-[#472825] mb-4 border-b border-zinc-100 pb-2">
          Filtros de Búsqueda
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-600">
              Tipo Documento
            </label>
            <select className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm transition-all text-[#472825]">
              <option value="">Todos</option>
              <option value="DC">DC - DEVOLUCION EN COMPRA</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-600">
              Fecha Desde
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm transition-all text-[#472825]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-600">
              Fecha Hasta
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm transition-all text-[#472825]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-600">
              Tercero Nit
            </label>
            <input
              type="text"
              placeholder="Ej: 900123456"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm transition-all text-[#472825] font-mono"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-600">
              Tercero
            </label>
            <div className="flex">
              <input
                type="text"
                placeholder="Nombre del proveedor"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 border-r-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm transition-all text-[#472825]"
              />
              <button className="bg-zinc-100 border border-zinc-200 border-l-0 px-3 rounded-r-lg hover:bg-zinc-200 transition-colors flex items-center justify-center text-zinc-600">
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Acciones</th>
                <th className="px-4 py-3">Documento</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Nit</th>
                <th className="px-4 py-3">Tercero</th>
                <th className="px-4 py-3 text-right">Subtotal</th>
                <th className="px-4 py-3 text-right">Descuento</th>
                <th className="px-4 py-3 text-right">Impuesto</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {mockData.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50 transition-colors text-zinc-700">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-1.5 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 font-mono font-medium text-[#472825]">{item.documento}</td>
                  <td className="px-4 py-2">{item.fecha}</td>
                  <td className="px-4 py-2 font-mono">{item.nit}</td>
                  <td className="px-4 py-2 font-medium">{item.tercero}</td>
                  <td className="px-4 py-2 text-right">${item.subtotal.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">${item.descuento.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">${item.impuesto.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right font-bold text-[#472825]">${item.total.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                        item.estado === "Aplicado"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.estado}
                    </span>
                  </td>
                </tr>
              ))}
              {mockData.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-zinc-500">
                    No hay registros para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mini Modal */}
      <AnimatePresence>
        {isMiniModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-5 border-b border-zinc-100 flex justify-between items-center bg-[#fdfbf9]">
                <h2 className="text-lg font-bold text-[#472825]">Nueva Devolucion de compra</h2>
                <button
                  onClick={() => setIsMiniModalOpen(false)}
                  className="text-zinc-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">
                  Seleccione el Tipo de Devolucion
                </label>
                <select className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-[#472825]">
                  <option value="DC">DC - DEVOLUCION EN COMPRA</option>
                </select>
              </div>
              <div className="p-5 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
                <button
                  onClick={() => setIsMiniModalOpen(false)}
                  className="px-5 py-2 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setIsMiniModalOpen(false);
                    setSelectedItem(null); // Clear selected item for new creation
                    setIsMainModalOpen(true);
                  }}
                  className="px-5 py-2 rounded-lg font-semibold bg-[#D3AB80] text-white hover:bg-amber-600 transition-colors shadow-sm"
                >
                  Aceptar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Modal */}
      <AnimatePresence>
        {isMainModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-5 border-b border-zinc-100 flex justify-between items-center bg-[#fdfbf9]">
                <h2 className="text-xl font-bold text-[#472825] flex items-center gap-2">
                  <FileText className="text-[#D3AB80]" size={24} />
                  Registro de Devolución
                </h2>
                <button
                  onClick={() => setIsMainModalOpen(false)}
                  className="text-zinc-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 bg-zinc-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-xl border border-zinc-100 shadow-sm mb-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-zinc-700">
                      Proveedor
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedItem?.tercero || ""}
                      placeholder="Ej: Joyería Mayorista S.A."
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-[#472825]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-zinc-700">
                      Fecha de Devolución
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedItem?.fecha ? selectedItem.fecha.split('/').reverse().join('-') : ""} // Convert DD/MM/YYYY to YYYY-MM-DD
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-[#472825]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-sm font-semibold text-zinc-700">
                      Número de Factura de Origen
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedItem?.documento || ""}
                      placeholder="Ej: INV-2023-001"
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono text-[#472825]"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-zinc-100 shadow-sm">
                  <h3 className="text-sm font-bold text-[#472825] border-b border-zinc-100 pb-3 mb-4">
                    Artículos a Devolver
                  </h3>
                  <textarea
                    rows={6}
                    placeholder="Detalle los productos de joyería 18k a devolver..."
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none text-[#472825]"
                  />
                </div>
              </div>

              <div className="p-5 border-t border-zinc-100 bg-zinc-50 flex justify-between items-center">
                <button
                  onClick={() => setIsMainModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setIsMainModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-semibold bg-[#D3AB80] text-white hover:bg-amber-600 hover:shadow-lg transition-all"
                >
                  Guardar Devolución
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
