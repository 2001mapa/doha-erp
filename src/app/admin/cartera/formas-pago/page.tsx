"use client";
import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, Check, X as XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockData = [
  { id: 1, codigo: "01", descripcion: "CONTADO", estado: true, pos: true, voucher: false, cuotas: false },
  { id: 2, codigo: "02", descripcion: "CRÉDITO 30 DÍAS", estado: true, pos: true, voucher: false, cuotas: true },
];

export default function FormasPagoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto w-full text-[#472825] min-h-screen bg-[#fdfbf9]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#472825]">Formas de Pago</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#D3AB80] text-white px-4 py-2 rounded-lg hover:bg-[#b8956e] transition-colors"
        >
          <Plus size={20} />
          <span>Nueva Forma de Pago</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-[#472825]">Código</th>
              <th className="px-6 py-4 font-semibold text-[#472825]">Descripción</th>
              <th className="px-6 py-4 font-semibold text-[#472825] text-center">Estado (Activo)</th>
              <th className="px-6 py-4 font-semibold text-[#472825] text-center">POS</th>
              <th className="px-6 py-4 font-semibold text-[#472825] text-center">Voucher</th>
              <th className="px-6 py-4 font-semibold text-[#472825] text-center">Cuotas</th>
              <th className="px-6 py-4 font-semibold text-[#472825] text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {mockData.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium">{item.codigo}</td>
                <td className="px-6 py-4 text-sm">{item.descripcion}</td>
                <td className="px-6 py-4 text-sm text-center">
                  {item.estado ? (
                    <span className="inline-flex justify-center items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Activo
                    </span>
                  ) : (
                    <span className="inline-flex justify-center items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  {item.pos ? <Check className="inline text-green-600" size={18} /> : <XIcon className="inline text-zinc-400" size={18} />}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  {item.voucher ? <Check className="inline text-green-600" size={18} /> : <XIcon className="inline text-zinc-400" size={18} />}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  {item.cuotas ? <Check className="inline text-green-600" size={18} /> : <XIcon className="inline text-zinc-400" size={18} />}
                </td>
                <td className="px-6 py-4 text-sm text-right">
                  <button className="text-zinc-400 hover:text-[#D3AB80] p-1 transition-colors" title="Editar">
                    <Edit2 size={16} />
                  </button>
                  <button className="text-zinc-400 hover:text-red-500 p-1 ml-2 transition-colors" title="Eliminar">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#472825]">Nueva Forma de Pago</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6">
                {/* Fila 1 (Identificación Básica - Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Código
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all"
                      placeholder="Ej: 01"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Descripción
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all"
                      placeholder="Ej: CONTADO"
                    />
                  </div>
                  <div className="md:col-span-3 flex items-center h-10 mb-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#D3AB80] border-zinc-300 rounded focus:ring-[#D3AB80]"
                        defaultChecked
                      />
                      <span className="text-sm font-medium text-zinc-700">Activo</span>
                    </label>
                  </div>
                </div>

                {/* Fila 2 (Reglas de Negocio - Contenedor con borde sutil) */}
                <div className="bg-white border border-zinc-200 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-[#472825] mb-3">Reglas de Negocio</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-[#D3AB80] border-zinc-300 rounded focus:ring-[#D3AB80]" />
                      <span className="text-sm text-zinc-700">Fecha Venc.</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-[#D3AB80] border-zinc-300 rounded focus:ring-[#D3AB80]" />
                      <span className="text-sm text-zinc-700">Aplica Punto de Venta</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-[#D3AB80] border-zinc-300 rounded focus:ring-[#D3AB80]" />
                      <span className="text-sm text-zinc-700">Aplica Cruce</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-[#D3AB80] border-zinc-300 rounded focus:ring-[#D3AB80]" />
                      <span className="text-sm text-zinc-700">Aplica Cuotas</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-[#D3AB80] border-zinc-300 rounded focus:ring-[#D3AB80]" />
                      <span className="text-sm text-zinc-700">Aplica Voucher</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-[#D3AB80] border-zinc-300 rounded focus:ring-[#D3AB80]" />
                      <span className="text-sm text-zinc-700">No graba impuesto</span>
                    </label>
                  </div>
                </div>

                {/* Fila 3 (Configuración Comercial y DIAN - Grid 3 columnas) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Días
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all"
                      placeholder="Ej: 30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Tipo
                    </label>
                    <select className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all">
                      <option value="">Seleccione tipo</option>
                      <option value="CONTADO">CONTADO</option>
                      <option value="CREDITO">CREDITO</option>
                      <option value="OTRO">OTRO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Medio de pago (Fact Electrónica)
                    </label>
                    <select className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all">
                      <option value="">Seleccione medio DIAN</option>
                      <option value="10">10 - Efectivo</option>
                      <option value="20">20 - Cheque</option>
                      <option value="31">31 - Transferencia Débito</option>
                      <option value="42">42 - Consignación bancaria</option>
                    </select>
                  </div>
                </div>

                {/* Fila 4 (Integración Contable) */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Cuenta
                  </label>
                  <select className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent outline-none transition-all">
                    <option value="">Seleccione cuenta PUC</option>
                    <option value="11050501">11050501 - CAJA PRINCIPAL</option>
                    <option value="13050501">13050501 - CLIENTES NACIONALES</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-zinc-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#D3AB80] text-white rounded-lg hover:bg-[#b8956e] transition-colors font-medium"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
