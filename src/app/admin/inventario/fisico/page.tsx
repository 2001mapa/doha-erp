"use client";

import { useState } from "react";
import { Search, Edit, Trash, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type InventarioRecord = {
  id: number;
  documento: string;
  fecha: string;
  numero: string;
  bodega: string;
  registros: number;
  ajustado: string;
  contabilizado: string;
  aplicaCategorias: string;
  fechaCreacion: string;
};

const INITIAL_MOCK_DATA: InventarioRecord[] = [
  {
    id: 1,
    documento: "AIT",
    fecha: "04/04/2026",
    numero: "001",
    bodega: "01-BODEGA PRINCIPAL DOHA",
    registros: 150,
    ajustado: "NO",
    contabilizado: "NO",
    aplicaCategorias: "NO",
    fechaCreacion: "04/04/2026"
  },
  {
    id: 2,
    documento: "AIT",
    fecha: "05/04/2026",
    numero: "002",
    bodega: "02-BODEGA MEDELLIN",
    registros: 75,
    ajustado: "SI",
    contabilizado: "NO",
    aplicaCategorias: "SI",
    fechaCreacion: "05/04/2026"
  }
];

export default function InventarioFisicoPage() {
  const [records, setRecords] = useState<InventarioRecord[]>(INITIAL_MOCK_DATA);
  const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<InventarioRecord | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleDelete = (id: number) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEdit = (record: InventarioRecord) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const closeMiniModal = () => setIsMiniModalOpen(false);
  const acceptMiniModal = () => {
    setIsMiniModalOpen(false);
    setIsFullModalOpen(true);
  };
  const closeFullModal = () => setIsFullModalOpen(false);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingRecord(null);
  };

  return (
    <div className="bg-[#fdfbf9] text-[#472825] min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header and Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Inventario Físico</h1>
            <p className="text-sm text-zinc-500 mt-1">Gestión de inventarios físicos</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsMiniModalOpen(true)}
              className="bg-[#D3AB80] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#c29b70] transition-colors"
            >
              Nuevo
            </button>
            <button
              className="bg-amber-100 text-[#472825] px-4 py-2 rounded-md font-semibold hover:bg-amber-200 transition-colors"
            >
              Unificar
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-600">Tipo de documento</label>
                <select className="w-full border border-zinc-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
                  <option value="">Todos</option>
                  <option value="AIT">AIT - AJUSTE DE INVENTARIO TOTAL</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-600">Fecha Desde</label>
                <input type="date" className="w-full border border-zinc-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-600">Fecha Hasta</label>
                <input type="date" className="w-full border border-zinc-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-600">Bodega</label>
                <select className="w-full border border-zinc-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
                  <option value="">Todas</option>
                  <option value="01">01-BODEGA PRINCIPAL DOHA</option>
                  <option value="02">02-BODEGA MEDELLIN</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-600">Ajustado</label>
                <select className="w-full border border-zinc-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
                  <option value="TODOS">TODOS</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                </select>
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setIsSearching(!isSearching)}
                className="bg-[#D3AB80] text-white p-2 h-[38px] rounded-md hover:bg-[#c29b70] transition-colors flex items-center justify-center w-full md:w-auto px-4"
              >
                <Search size={18} className="mr-2" />
                {isSearching ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Documento</th>
                  <th className="px-4 py-3 font-semibold">Fecha</th>
                  <th className="px-4 py-3 font-semibold">Numero</th>
                  <th className="px-4 py-3 font-semibold">Bodega</th>
                  <th className="px-4 py-3 font-semibold">Registros</th>
                  <th className="px-4 py-3 font-semibold">Ajustado</th>
                  <th className="px-4 py-3 font-semibold">Contabilizado</th>
                  <th className="px-4 py-3 font-semibold">Aplica Categorias</th>
                  <th className="px-4 py-3 font-semibold">Fecha Creacion</th>
                  <th className="px-4 py-3 font-semibold text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {records.length > 0 ? (
                  records.map((record) => (
                    <tr key={record.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-4 py-3">{record.documento}</td>
                      <td className="px-4 py-3">{record.fecha}</td>
                      <td className="px-4 py-3">{record.numero}</td>
                      <td className="px-4 py-3">{record.bodega}</td>
                      <td className="px-4 py-3">{record.registros}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.ajustado === 'SI' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {record.ajustado}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.contabilizado === 'SI' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {record.contabilizado}
                        </span>
                      </td>
                      <td className="px-4 py-3">{record.aplicaCategorias}</td>
                      <td className="px-4 py-3">{record.fechaCreacion}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(record)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Eliminar"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-zinc-500">
                      No hay registros para mostrar
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Mini Modal (Step 1) */}
      <AnimatePresence>
        {isMiniModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={closeMiniModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#472825] mb-4">Seleccione el tipo de inventario</h3>
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2 text-zinc-700">Seleccione el Tipo de Inventario</label>
                  <select className="w-full border border-zinc-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AB80]">
                    <option value="AIT">AIT - AJUSTE DE INVENTARIO TOTAL</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeMiniModal}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-md text-sm font-semibold hover:bg-red-100 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={acceptMiniModal}
                    className="px-4 py-2 bg-[#D3AB80] text-white rounded-md text-sm font-semibold hover:bg-[#c29b70] transition-colors"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Size Form Modal (Step 2) */}
      <AnimatePresence>
        {isFullModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={closeFullModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-zinc-200">
                <h2 className="text-xl font-bold text-[#472825]">Nuevo Inventario Físico</h2>
                <button onClick={closeFullModal} className="text-zinc-400 hover:text-zinc-600">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                {/* Formulario vacío preparado para el conteo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-zinc-700">Documento</label>
                    <input type="text" value="AIT" disabled className="w-full border border-zinc-200 bg-zinc-50 rounded-md p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-zinc-700">Bodega</label>
                    <select className="w-full border border-zinc-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
                      <option value="01">01-BODEGA PRINCIPAL DOHA</option>
                    </select>
                  </div>
                </div>
                <div className="p-8 border-2 border-dashed border-zinc-200 rounded-xl flex flex-col items-center justify-center text-zinc-500">
                  <p>Formulario de conteo de inventario (Próximamente)</p>
                </div>
              </div>
              <div className="p-4 border-t border-zinc-200 flex justify-between bg-zinc-50">
                <button
                  onClick={closeFullModal}
                  className="px-6 py-2 bg-red-50 text-red-600 rounded-md font-semibold hover:bg-red-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={closeFullModal}
                  className="px-6 py-2 bg-[#D3AB80] text-white rounded-md font-semibold hover:bg-[#c29b70] transition-colors"
                >
                  Guardar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Form Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={closeEditModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-zinc-200">
                <h2 className="text-xl font-bold text-[#472825]">Editar Inventario Físico - {editingRecord.numero}</h2>
                <button onClick={closeEditModal} className="text-zinc-400 hover:text-zinc-600">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-zinc-700">Documento</label>
                    <input type="text" defaultValue={editingRecord.documento} className="w-full border border-zinc-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-zinc-700">Fecha</label>
                    <input type="text" defaultValue={editingRecord.fecha} className="w-full border border-zinc-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-zinc-700">Número</label>
                    <input type="text" defaultValue={editingRecord.numero} className="w-full border border-zinc-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-zinc-700">Bodega</label>
                    <input type="text" defaultValue={editingRecord.bodega} className="w-full border border-zinc-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-zinc-700">Registros</label>
                    <input type="number" defaultValue={editingRecord.registros} className="w-full border border-zinc-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]" />
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-zinc-200 flex justify-between bg-zinc-50">
                <button
                  onClick={closeEditModal}
                  className="px-6 py-2 bg-red-50 text-red-600 rounded-md font-semibold hover:bg-red-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={closeEditModal}
                  className="px-6 py-2 bg-[#D3AB80] text-white rounded-md font-semibold hover:bg-[#c29b70] transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
