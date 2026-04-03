"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  FileSpreadsheet,
  ArrowLeft,
  Check,
  X,
  FileText,
} from "lucide-react";
import { AdminGuard } from "@/src/components/AdminGuard";

// Types
type CostAdjustment = {
  id: string;
  document: string;
  date: string;
  product: string;
};

// Main Mock Data
const MOCK_ADJUSTMENTS: CostAdjustment[] = [
  { id: "1", document: "AJT-001", date: "2023-10-25", product: "Cadena Lomo Corbina 18k" },
  { id: "2", document: "AJT-002", date: "2023-10-26", product: "Pulsera Rolex Laminado 18k" },
];

export default function CostoPage() {
  const [showInconsistencias, setShowInconsistencias] = useState(false);
  const [showNewTypeModal, setShowNewTypeModal] = useState(false);
  const [showNewFormModal, setShowNewFormModal] = useState(false);
  const [adjustmentType, setAdjustmentType] = useState("aumento");

  // Filter States
  const [filterDoc, setFilterDoc] = useState("");
  const [filterDesde, setFilterDesde] = useState("");
  const [filterHasta, setFilterHasta] = useState("");
  const [filterNumero, setFilterNumero] = useState("");

  const handleSimulateAction = (actionName: string) => {
    alert(`Sincronizando producto... Acción: ${actionName}`);
  };

  const renderMainView = () => (
    <div className="max-w-7xl mx-auto p-6 bg-[#fdfbf9] text-[#472825] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ajuste Costo Producto</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowInconsistencias(true)}
            className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-lg hover:bg-blue-200 transition-colors"
          >
            Inconsistencias
          </button>
          <button
            onClick={() => setShowNewTypeModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#D3AB80] text-white font-semibold rounded-lg hover:bg-[#b8956b] transition-colors"
          >
            <Plus size={20} />
            Nuevo
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Documento</label>
            <select
              value={filterDoc}
              onChange={(e) => setFilterDoc(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#D3AB80]"
            >
              <option value="">Todos</option>
              <option value="AJT">AJT - Ajuste Costo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Desde</label>
            <input
              type="date"
              value={filterDesde}
              onChange={(e) => setFilterDesde(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#D3AB80]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Hasta</label>
            <input
              type="date"
              value={filterHasta}
              onChange={(e) => setFilterHasta(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#D3AB80]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Número</label>
            <input
              type="text"
              value={filterNumero}
              onChange={(e) => setFilterNumero(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#D3AB80]"
              placeholder="Ej. 001"
            />
          </div>
          <div className="flex items-end gap-2 lg:col-span-1 justify-end">
            <button
              onClick={() => {}}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-700"
              title="Buscar"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => {}}
              className="p-2 bg-green-50 hover:bg-green-100 rounded transition-colors text-green-700"
              title="Exportar a Excel"
            >
              <FileSpreadsheet size={20} />
            </button>
             <button
              onClick={() => {}}
              className="p-2 bg-red-50 hover:bg-red-100 rounded transition-colors text-red-700"
              title="Exportar a PDF"
            >
               <FileText size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-sm">Acciones</th>
              <th className="p-4 font-semibold text-sm">Documento</th>
              <th className="p-4 font-semibold text-sm">Fecha</th>
              <th className="p-4 font-semibold text-sm">Producto</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ADJUSTMENTS.map((adj) => (
              <tr key={adj.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                   <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Ver</button>
                </td>
                <td className="p-4 text-sm">{adj.document}</td>
                <td className="p-4 text-sm">{adj.date}</td>
                <td className="p-4 text-sm">{adj.product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInconsistencias = () => (
    <div className="max-w-7xl mx-auto p-6 bg-[#fdfbf9] text-[#472825] min-h-screen">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setShowInconsistencias(false)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mr-4"
        >
          <ArrowLeft size={20} />
          Volver
        </button>
        <h1 className="text-2xl font-bold flex-1 text-center pr-24">
          INCONSISTENCIAS EN CUENTA 14
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tarjeta 1 */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-semibold text-lg mb-4 border-b pb-2">PRODUCTOS CON INCONSISTENCIAS</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2">#</th>
                  <th className="p-2">Código</th>
                  <th className="p-2">Producto</th>
                  <th className="p-2">Cantidad</th>
                  <th className="p-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">1</td>
                  <td className="p-2">PROD-001</td>
                  <td className="p-2">Cadena Lomo Corbina 18k</td>
                  <td className="p-2">4</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleSimulateAction("Agregar Inconsistencia de Producto")}
                      className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                      title="Resolver"
                    >
                      <Plus size={16} />
                    </button>
                  </td>
                </tr>
                <tr className="border-t font-semibold bg-gray-50">
                  <td colSpan={3} className="p-2 text-right">Total</td>
                  <td colSpan={2} className="p-2">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-semibold text-lg mb-4 border-b pb-2">MOVIMIENTOS CUENTA 1435 SIN PRODUCTOS</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2">Prefijo</th>
                  <th className="p-2">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">AJT</td>
                  <td className="p-2">2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-semibold text-lg mb-4 border-b pb-2">DOCUMENTOS CON MOVIMIENTO ERRONEO</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2">Categoría</th>
                  <th className="p-2">Prefijo</th>
                  <th className="p-2">Cantidad</th>
                  <th className="p-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">FC</td>
                  <td className="p-2">REM</td>
                  <td className="p-2">13</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleSimulateAction("Resolver Documento Erróneo")}
                      className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                      title="Resolver"
                    >
                      <Plus size={16} />
                    </button>
                  </td>
                </tr>
                <tr className="border-t font-semibold bg-gray-50">
                  <td colSpan={2} className="p-2 text-right">Total</td>
                  <td colSpan={2} className="p-2">13</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tarjeta 4 */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-semibold text-lg mb-4 border-b pb-2">PRODUCTOS CON SALDOS NEGATIVOS</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2">Código</th>
                  <th className="p-2">Producto</th>
                  <th className="p-2">Inv.</th>
                  <th className="p-2">Contab.</th>
                  <th className="p-2">Dif.</th>
                  <th className="p-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">PROD-002</td>
                  <td className="p-2">Pulsera Rolex Laminado 18k</td>
                  <td className="p-2">0.00</td>
                  <td className="p-2 text-red-500">-120.00</td>
                  <td className="p-2 text-red-500">-120.00</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleSimulateAction("Sincronizar Saldo Negativo")}
                      className="p-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      title="Sincronizar"
                    >
                      <Check size={16} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminGuard>
      <AnimatePresence mode="wait">
        {showInconsistencias ? (
          <motion.div
            key="inconsistencias"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderInconsistencias()}
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {renderMainView()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Modal - Select Type */}
      <AnimatePresence>
        {showNewTypeModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[#472825]">Tipo de Ajuste</h3>
                <button
                  onClick={() => setShowNewTypeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Seleccione el Tipo de Ajuste Costo que desea crear:
              </p>
              <select
                value={adjustmentType}
                onChange={(e) => setAdjustmentType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#D3AB80] mb-6"
              >
                <option value="aumento">Aumento de Costo</option>
                <option value="disminucion">Disminución de Costo</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowNewTypeModal(false)}
                  className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowNewTypeModal(false);
                    setShowNewFormModal(true);
                  }}
                  className="px-4 py-2 text-white bg-[#D3AB80] hover:bg-[#b8956b] rounded transition-colors"
                >
                  Aceptar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Modal - New Cost Adjustment Form */}
      <AnimatePresence>
        {showNewFormModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-bold text-[#472825]">
                  Nuevo Ajuste de Costo - {adjustmentType === "aumento" ? "Aumento" : "Disminución"}
                </h2>
                <button
                  onClick={() => setShowNewFormModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Fecha</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#D3AB80]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Documento Ref.</label>
                  <input
                    type="text"
                    placeholder="Ej. FAC-1234"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#D3AB80]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Producto</label>
                  <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#D3AB80]">
                    <option value="">Seleccione un producto...</option>
                    <option value="1">Cadena Lomo Corbina 18k</option>
                    <option value="2">Pulsera Rolex Laminado 18k</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Observaciones</label>
                  <textarea
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#D3AB80]"
                    placeholder="Detalles del ajuste..."
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowNewFormModal(false)}
                  className="px-6 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowNewFormModal(false);
                    alert("Ajuste de costo guardado exitosamente");
                  }}
                  className="px-6 py-2 text-white bg-[#D3AB80] hover:bg-[#b8956b] rounded font-medium transition-colors"
                >
                  Guardar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminGuard>
  );
}
