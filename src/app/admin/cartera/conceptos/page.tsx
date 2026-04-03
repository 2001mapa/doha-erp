"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, Check, XCircle } from "lucide-react";

type Concepto = {
  id: number;
  codigo: string;
  descripcion: string;
  tipo: string;
  restringido: boolean;
  activo: boolean;
  ajusteRc: boolean;
  edades: boolean;
  cuenta: string;
};

const mockData: Concepto[] = [
  {
    id: 1,
    codigo: "C1",
    descripcion: "CUENTAS X COBRAR",
    tipo: "I",
    restringido: false,
    activo: true,
    ajusteRc: false,
    edades: true,
    cuenta: "13050501 - CLIENTES NACIONALES",
  },
  {
    id: 2,
    codigo: "C2",
    descripcion: "CUENTAS X PAGAR",
    tipo: "E",
    restringido: true,
    activo: true,
    ajusteRc: false,
    edades: false,
    cuenta: "22050501 - PROVEEDORES NACIONALES",
  },
  {
    id: 3,
    codigo: "AVR",
    descripcion: "AVERIAS Y FALTANTES",
    tipo: "A",
    restringido: false,
    activo: true,
    ajusteRc: true,
    edades: false,
    cuenta: "51959504 - AVERIAS",
  },
];

export default function ConceptosCarteraPage() {
  const [conceptos] = useState<Concepto[]>(mockData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const openModal = (id: number | null = null) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-[#472825] font-sans">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Conceptos de Cartera</h1>
          <button
            onClick={() => openModal(null)}
            className="flex items-center gap-2 bg-[#D3AB80] text-white px-4 py-2 rounded-md hover:bg-[#c29b70] transition-colors"
          >
            <Plus size={20} />
            <span>Nuevo Concepto</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-sm">Código</th>
                <th className="p-4 font-semibold text-sm">Descripción</th>
                <th className="p-4 font-semibold text-sm">Tipo</th>
                <th className="p-4 font-semibold text-sm text-center">Restringido</th>
                <th className="p-4 font-semibold text-sm text-center">Activo</th>
                <th className="p-4 font-semibold text-sm text-center">Ajuste RC</th>
                <th className="p-4 font-semibold text-sm text-center">Edades</th>
                <th className="p-4 font-semibold text-sm">Cuenta</th>
                <th className="p-4 font-semibold text-sm text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {conceptos.map((concepto) => (
                <tr key={concepto.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{concepto.codigo}</td>
                  <td className="p-4">{concepto.descripcion}</td>
                  <td className="p-4 font-medium">
                    {concepto.tipo === "I" ? "Ingreso" : concepto.tipo === "E" ? "Egreso" : "Ajuste"}
                  </td>
                  <td className="p-4 text-center">
                    {concepto.restringido ? (
                      <Check size={18} className="mx-auto text-green-600" />
                    ) : (
                      <XCircle size={18} className="mx-auto text-gray-300" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {concepto.activo ? (
                      <Check size={18} className="mx-auto text-green-600" />
                    ) : (
                      <XCircle size={18} className="mx-auto text-red-400" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {concepto.ajusteRc ? (
                      <Check size={18} className="mx-auto text-green-600" />
                    ) : (
                      <XCircle size={18} className="mx-auto text-gray-300" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {concepto.edades ? (
                      <Check size={18} className="mx-auto text-green-600" />
                    ) : (
                      <XCircle size={18} className="mx-auto text-gray-300" />
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{concepto.cuenta}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openModal(concepto.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#fdfbf9] w-full max-w-4xl rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                <h2 className="text-xl font-bold text-[#472825]">
                  {editingId ? "Editar Concepto" : "Nuevo Concepto"}
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form className="space-y-6">
                  {/* Fila 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Tipo</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none">
                        <option value="I">Ingreso</option>
                        <option value="E">Egreso</option>
                        <option value="A">Ajuste</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Código</label>
                      <input
                        type="text"
                        placeholder="Ej: C1"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Descripción</label>
                      <input
                        type="text"
                        placeholder="Ej: CUENTAS X COBRAR"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none"
                      />
                    </div>
                  </div>

                  {/* Fila 2 - Configuración */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h3 className="text-md font-semibold text-[#472825] mb-4">Configuración y Reglas de Negocio</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        "Ajuste Recibo",
                        "Ajuste Recibo Base",
                        "Ajuste Pago",
                        "Aplica Pago Base",
                        "Aplica Edades",
                        "App Movil",
                        "App Plus",
                        "Aplica base para comision",
                        "Aplica comision",
                        "Aplica %",
                      ].map((label) => (
                        <label key={label} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-[#D3AB80] border-gray-300 rounded focus:ring-[#D3AB80]"
                          />
                          <span className="text-sm text-gray-700">{label}</span>
                        </label>
                      ))}

                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-700 whitespace-nowrap">Max %</label>
                        <input
                          type="number"
                          defaultValue="0.00"
                          step="0.01"
                          className="w-20 border border-gray-300 rounded-md p-1 text-sm focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <label className="flex items-center gap-2 cursor-pointer w-fit">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                        />
                        <span className="text-sm font-medium text-red-700">Restringido</span>
                      </label>
                    </div>
                  </div>

                  {/* Fila 3 - Integración Contable */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Cuenta</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none">
                        <option value="">Seleccione cuenta...</option>
                        <option value="11050501">11050501 - CAJA PRINCIPAL</option>
                        <option value="13050501">13050501 - CLIENTES NACIONALES</option>
                        <option value="22050501">22050501 - PROVEEDORES NACIONALES</option>
                        <option value="51959504">51959504 - AVERIAS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Centro Costo</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none">
                        <option value="">Seleccione centro de costo...</option>
                        <option value="01">01 - INVERSIONES DOHA</option>
                        <option value="02">02 - VENTAS DOHA</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-200 bg-white flex justify-between items-center mt-auto">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 bg-red-50 text-red-600 font-medium rounded-md hover:bg-red-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-[#D3AB80] text-white font-medium rounded-md hover:bg-[#c29b70] transition-colors"
                >
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
