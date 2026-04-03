"use client";
import { useState } from "react";
import { Plus, Search, Trash2, Download, Upload, Check, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotasContablesPage() {
  // Modal states: 0 = closed, 1 = selection modal, 2 = main form modal
  const [modalStep, setModalStep] = useState<0 | 1 | 2>(0);
  const [selectedType, setSelectedType] = useState("CONTABLE");

  // Dummy data for table
  const dummyData = [
    { id: 1, mes: "01", fecha: "2024-01-15", documento: "NC-1001", nit: "900.123.456-7", tercero: "Proveedor A", cuadrado: true, estado: "Activo", debito: 1500000, credito: 1500000 },
    { id: 2, mes: "02", fecha: "2024-02-10", documento: "NC-1002", nit: "800.987.654-3", tercero: "Cliente B", cuadrado: true, estado: "Activo", debito: 500000, credito: 500000 },
    { id: 3, mes: "02", fecha: "2024-02-28", documento: "NC-1003", nit: "123.456.789-0", tercero: "Proveedor C", cuadrado: false, estado: "Anulado", debito: 0, credito: 0 },
  ];

  const totalDebito = dummyData.reduce((acc, curr) => acc + curr.debito, 0);
  const totalCredito = dummyData.reduce((acc, curr) => acc + curr.credito, 0);

  const formatCurrency = (val: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(val);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full min-h-screen" style={{ backgroundColor: "#fdfbf9", color: "#472825" }}>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black mb-1">Notas Contables</h1>
          <p className="text-sm opacity-80">Gestión de ajustes y notas en el sistema contable.</p>
        </div>
        <button
          onClick={() => setModalStep(1)}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-[#D3AB80] to-[#b38e65] text-white font-bold shadow-lg shadow-[#D3AB80]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full md:w-auto"
        >
          <Plus size={20} />
          <span>Nueva Nota</span>
        </button>
      </div>

      {/* TOOLBAR & FILTERS */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 mb-6 flex flex-col gap-4">
        {/* Top bar with export/import */}
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors text-sm font-semibold">
            <Download size={18} className="text-[#D3AB80]" />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors text-sm font-semibold">
            <Upload size={18} className="text-[#D3AB80]" />
            Importar
          </button>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Fecha Desde</label>
            <input type="date" className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-[#D3AB80] focus:ring-1 focus:ring-[#D3AB80] outline-none text-sm" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Fecha Hasta</label>
            <input type="date" className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-[#D3AB80] focus:ring-1 focus:ring-[#D3AB80] outline-none text-sm" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Número de nota</label>
            <input type="text" placeholder="Ej. NC-1001" className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-[#D3AB80] focus:ring-1 focus:ring-[#D3AB80] outline-none text-sm" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Nombre Tercero</label>
            <input type="text" placeholder="Buscar..." className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-[#D3AB80] focus:ring-1 focus:ring-[#D3AB80] outline-none text-sm" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Estado</label>
            <select className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-[#D3AB80] focus:ring-1 focus:ring-[#D3AB80] outline-none text-sm">
              <option>TODOS</option>
              <option>Activo</option>
              <option>Anulado</option>
            </select>
          </div>
          <div className="md:col-span-1 flex justify-end">
            <button className="flex items-center justify-center w-full md:w-auto px-6 py-2 rounded-lg bg-[#D3AB80] hover:bg-[#b38e65] text-white transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-100">
                <th className="py-4 px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Mes</th>
                <th className="py-4 px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Fecha</th>
                <th className="py-4 px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Documento</th>
                <th className="py-4 px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Nit</th>
                <th className="py-4 px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Tercero</th>
                <th className="py-4 px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Cuadrado</th>
                <th className="py-4 px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Estado</th>
                <th className="py-4 px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Débito</th>
                <th className="py-4 px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Crédito</th>
                <th className="py-4 px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {dummyData.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3 px-4 text-sm">{row.mes}</td>
                  <td className="py-3 px-4 text-sm">{row.fecha}</td>
                  <td className="py-3 px-4 text-sm font-medium">{row.documento}</td>
                  <td className="py-3 px-4 text-sm text-zinc-500">{row.nit}</td>
                  <td className="py-3 px-4 text-sm">{row.tercero}</td>
                  <td className="py-3 px-4 text-sm text-center">
                    {row.cuadrado ? (
                      <Check size={18} className="mx-auto text-green-500" />
                    ) : (
                      <span className="text-zinc-300">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {row.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right tabular-nums">{formatCurrency(row.debito)}</td>
                  <td className="py-3 px-4 text-sm text-right tabular-nums">{formatCurrency(row.credito)}</td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver detalle">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-zinc-50 border-t-2 border-zinc-200">
                <td colSpan={7} className="py-4 px-4 text-right font-bold text-sm uppercase">Totales:</td>
                <td className="py-4 px-4 text-right font-bold text-sm tabular-nums text-[#D3AB80]">{formatCurrency(totalDebito)}</td>
                <td className="py-4 px-4 text-right font-bold text-sm tabular-nums text-[#D3AB80]">{formatCurrency(totalCredito)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {/* STEP 1: Type Selection Modal */}
        {modalStep === 1 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-zinc-100"
            >
              <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
                <h2 className="text-lg font-bold" style={{ color: "#472825" }}>Seleccione el tipo de Nota Contable</h2>
              </div>
              <div className="p-6">
                <label className="block text-sm font-bold text-zinc-500 mb-2">Tipo de Nota</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-white focus:border-[#D3AB80] focus:ring-2 focus:ring-[#D3AB80]/20 outline-none transition-all text-sm"
                >
                  <option value="CONTABLE">CONTABLE</option>
                  <option value="CONTABLE 2">CONTABLE 2</option>
                  <option value="SALDOS INICIALES">SALDOS INICIALES</option>
                </select>
              </div>
              <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex justify-between gap-3">
                <button
                  onClick={() => setModalStep(0)}
                  className="px-5 py-2.5 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors text-sm w-full"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setModalStep(2)}
                  className="px-5 py-2.5 rounded-xl font-bold bg-[#D3AB80] hover:bg-[#b38e65] text-white shadow-lg transition-all text-sm w-full"
                >
                  Aceptar
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* STEP 2: Main Form Modal */}
        {modalStep === 2 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden border border-zinc-100"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                <h2 className="text-xl font-bold" style={{ color: "#472825" }}>Nueva Nota Contable - {selectedType}</h2>
                <button
                  onClick={() => setModalStep(0)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-200 text-zinc-500 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Body (Scrollable) */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Fecha</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg border border-zinc-200 bg-white focus:border-[#D3AB80] focus:ring-1 focus:ring-[#D3AB80] outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Tipo de Nota</label>
                    <input
                      type="text"
                      value={selectedType}
                      disabled
                      className="w-full px-4 py-2 rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-500 cursor-not-allowed outline-none text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Tercero</label>
                    <input
                      type="text"
                      placeholder="Buscar tercero..."
                      className="w-full px-4 py-2 rounded-lg border border-zinc-200 bg-white focus:border-[#D3AB80] focus:ring-1 focus:ring-[#D3AB80] outline-none text-sm"
                    />
                  </div>
                  <div className="md:col-span-3">
                     <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Concepto General</label>
                     <input
                      type="text"
                      placeholder="Descripción de la nota..."
                      className="w-full px-4 py-2 rounded-lg border border-zinc-200 bg-white focus:border-[#D3AB80] focus:ring-1 focus:ring-[#D3AB80] outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Inner Table for lines */}
                <div className="border border-zinc-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-100 border-b border-zinc-200">
                      <tr>
                        <th className="py-3 px-4 text-xs font-bold text-zinc-600 uppercase w-1/3">Cuenta PUC</th>
                        <th className="py-3 px-4 text-xs font-bold text-zinc-600 uppercase w-1/3">Tercero</th>
                        <th className="py-3 px-4 text-xs font-bold text-zinc-600 uppercase text-right">Débito</th>
                        <th className="py-3 px-4 text-xs font-bold text-zinc-600 uppercase text-right">Crédito</th>
                        <th className="py-3 px-4 text-xs font-bold text-zinc-600 uppercase text-center w-16">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {/* Empty Line Example */}
                      <tr>
                         <td className="p-2">
                           <input type="text" placeholder="Ej. 110505" className="w-full px-3 py-1.5 rounded border border-zinc-200 text-sm focus:border-[#D3AB80] outline-none" />
                         </td>
                         <td className="p-2">
                           <input type="text" placeholder="Tercero línea..." className="w-full px-3 py-1.5 rounded border border-zinc-200 text-sm focus:border-[#D3AB80] outline-none" />
                         </td>
                         <td className="p-2">
                           <input type="number" placeholder="0" className="w-full px-3 py-1.5 rounded border border-zinc-200 text-sm text-right focus:border-[#D3AB80] outline-none" />
                         </td>
                         <td className="p-2">
                           <input type="number" placeholder="0" className="w-full px-3 py-1.5 rounded border border-zinc-200 text-sm text-right focus:border-[#D3AB80] outline-none" />
                         </td>
                         <td className="p-2 text-center">
                           <button className="p-1.5 text-zinc-400 hover:text-red-500 rounded transition-colors"><Trash2 size={16}/></button>
                         </td>
                      </tr>
                       <tr>
                         <td colSpan={5} className="p-2">
                            <button className="flex items-center gap-1 text-sm font-medium text-[#D3AB80] hover:text-[#b38e65] px-2 py-1">
                               <Plus size={16} /> Agregar Línea
                            </button>
                         </td>
                       </tr>
                    </tbody>
                    <tfoot className="bg-zinc-50 border-t border-zinc-200">
                       <tr>
                         <td colSpan={2} className="py-3 px-4 text-right font-bold text-sm">Sumas Iguales:</td>
                         <td className="py-3 px-4 text-right font-bold text-sm">0</td>
                         <td className="py-3 px-4 text-right font-bold text-sm">0</td>
                         <td></td>
                       </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
                <button
                  onClick={() => setModalStep(0)}
                  className="px-6 py-2.5 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  Cancelar
                </button>
                <button className="px-8 py-2.5 rounded-xl font-bold bg-[#D3AB80] hover:bg-[#b38e65] text-white shadow-lg transition-all">
                  Guardar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
