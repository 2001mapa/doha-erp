"use client";

import React, { useState } from "react";
import { Plus, Calculator, Percent, Search, FileSpreadsheet, Trash2, Edit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data Types
interface Recibo {
  id: number;
  documento: string;
  fecha: string;
  nit: string;
  tercero: string;
  caja: string;
  valor: number;
  descuento: number;
  neto: number;
  registros: number;
  estado: string;
  aprobado: string;
  revisado: string;
}

const initialRecibos: Recibo[] = [
  {
    id: 1,
    documento: "RC-001",
    fecha: "01/04/2026",
    nit: "900123456-1",
    tercero: "CLIENTE A",
    caja: "CAJA PRINCIPAL",
    valor: 500000,
    descuento: 0,
    neto: 500000,
    registros: 1,
    estado: "Activo",
    aprobado: "SI",
    revisado: "SI"
  },
  {
    id: 2,
    documento: "RC-002",
    fecha: "02/04/2026",
    nit: "800987654-2",
    tercero: "CLIENTE B",
    caja: "CAJA MENOR",
    valor: 150000,
    descuento: 5000,
    neto: 145000,
    registros: 2,
    estado: "Activo",
    aprobado: "NO",
    revisado: "NO"
  },
  {
    id: 3,
    documento: "RC-003",
    fecha: "05/04/2026",
    nit: "1020304050",
    tercero: "CLIENTE C",
    caja: "BANCOLOMBIA",
    valor: 2000000,
    descuento: 0,
    neto: 2000000,
    registros: 5,
    estado: "Inactivo",
    aprobado: "SI",
    revisado: "NO"
  }
];

export default function RecibosDeCajaPage() {
  const [recibos, setRecibos] = useState<Recibo[]>(initialRecibos);

  // Modal states
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);

  // Form states
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fecha: "",
    tercero: "",
    valor: "",
    concepto: "",
  });

  // Action Handlers
  const handleDelete = (id: number) => {
    setRecibos(recibos.filter(r => r.id !== id));
  };

  const handleEdit = (recibo: Recibo) => {
    setEditingId(recibo.id);
    setFormData({
      fecha: recibo.fecha,
      tercero: recibo.tercero,
      valor: recibo.valor.toString(),
      concepto: "Concepto por defecto", // Defaulting as it's not in the grid
    });
    setIsMainModalOpen(true);
  };

  const handleNewReciboClick = () => {
    setEditingId(null);
    setFormData({ fecha: "", tercero: "", valor: "", concepto: "" });
    setIsTypeModalOpen(true);
  };

  const handleTypeModalAccept = () => {
    setIsTypeModalOpen(false);
    setIsMainModalOpen(true);
  };

  const handleMainModalSave = () => {
    if (editingId) {
      // Update
      setRecibos(recibos.map(r => r.id === editingId ? {
        ...r,
        fecha: formData.fecha,
        tercero: formData.tercero,
        valor: Number(formData.valor) || 0,
        neto: Number(formData.valor) || 0 // Simplifying for mock
      } : r));
    } else {
      // Create new
      const newRecibo: Recibo = {
        id: Math.max(0, ...recibos.map(r => r.id)) + 1,
        documento: `RC-00${recibos.length + 4}`,
        fecha: formData.fecha || "01/01/2026",
        nit: "000000000-0",
        tercero: formData.tercero || "NUEVO TERCERO",
        caja: "CAJA PRINCIPAL",
        valor: Number(formData.valor) || 0,
        descuento: 0,
        neto: Number(formData.valor) || 0,
        registros: 1,
        estado: "Activo",
        aprobado: "NO",
        revisado: "NO"
      };
      setRecibos([...recibos, newRecibo]);
    }
    setIsMainModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#fdfbf9] min-h-screen text-[#472825]">
      <h1 className="text-2xl font-semibold mb-6">Recibos de Caja</h1>

      {/* 1. Botones de Acción Superiores */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleNewReciboClick}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D3AB80] text-[#D3AB80] hover:bg-[#D3AB80] hover:text-white transition-colors rounded-md font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo Recibo
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D3AB80] text-[#D3AB80] hover:bg-[#D3AB80] hover:text-white transition-colors rounded-md font-medium shadow-sm">
          <Calculator className="w-4 h-4" />
          Liquidar neto
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D3AB80] text-[#D3AB80] hover:bg-[#D3AB80] hover:text-white transition-colors rounded-md font-medium shadow-sm">
          <Percent className="w-4 h-4" />
          Comisión x Factura
        </button>
      </div>

      {/* 2. Panel de Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex items-start justify-between gap-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
          {/* Fila 1 */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Estado</label>
            <select className="w-full text-sm border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2">
              <option>TODOS</option>
              <option>ACTIVO</option>
              <option>ANULADO</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Fecha Desde</label>
            <input type="date" className="w-full text-sm border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Fecha Hasta</label>
            <input type="date" className="w-full text-sm border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Numero de Recibo</label>
            <input type="text" placeholder="Ej: RC-001" className="w-full text-sm border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Aprobados</label>
            <select className="w-full text-sm border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2">
              <option>TODOS</option>
              <option>SI</option>
              <option>NO</option>
            </select>
          </div>

          {/* Fila 2 */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Recaudador</label>
            <select className="w-full text-sm border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2">
              <option>TODOS</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Caja</label>
            <select className="w-full text-sm border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2">
              <option>TODAS</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">Tercero</label>
            <select className="w-full text-sm border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2">
              <option>TODOS</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Observacion</label>
            <input type="text" className="w-full text-sm border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2" />
          </div>
        </div>

        {/* Acciones de Filtro Right Side */}
        <div className="flex flex-col gap-2 shrink-0 border-l border-gray-100 pl-4">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#D3AB80] text-white hover:bg-[#b89570] transition-colors rounded-md font-medium shadow-sm w-full">
            <Search className="w-4 h-4" />
            <span className="hidden md:inline">Buscar</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors rounded-md font-medium shadow-sm w-full">
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden md:inline">Exportar</span>
          </button>
        </div>
      </div>

      {/* 3. Tabla de Datos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                <th className="p-3">Acciones</th>
                <th className="p-3">Documento</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Nit</th>
                <th className="p-3">Tercero</th>
                <th className="p-3">Caja</th>
                <th className="p-3 text-right">Valor</th>
                <th className="p-3 text-right">Descuento</th>
                <th className="p-3 text-right">Neto</th>
                <th className="p-3 text-center">Registros</th>
                <th className="p-3 text-center">Estado</th>
                <th className="p-3 text-center">Aprobado</th>
                <th className="p-3 text-center">Revisado</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recibos.map((recibo) => (
                <tr key={recibo.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(recibo)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(recibo.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="p-3 font-medium text-gray-700">{recibo.documento}</td>
                  <td className="p-3">{recibo.fecha}</td>
                  <td className="p-3">{recibo.nit}</td>
                  <td className="p-3 truncate max-w-[150px]">{recibo.tercero}</td>
                  <td className="p-3 text-gray-500 text-xs">{recibo.caja}</td>
                  <td className="p-3 text-right font-medium">${recibo.valor.toLocaleString()}</td>
                  <td className="p-3 text-right text-gray-500">${recibo.descuento.toLocaleString()}</td>
                  <td className="p-3 text-right font-semibold text-[#D3AB80]">${recibo.neto.toLocaleString()}</td>
                  <td className="p-3 text-center">{recibo.registros}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      recibo.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {recibo.estado}
                    </span>
                  </td>
                  <td className="p-3 text-center">{recibo.aprobado}</td>
                  <td className="p-3 text-center">{recibo.revisado}</td>
                </tr>
              ))}
              {recibos.length === 0 && (
                <tr>
                  <td colSpan={13} className="p-6 text-center text-gray-500">
                    No hay recibos de caja para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Modales */}
      <AnimatePresence>
        {/* Modal Pequeño: Tipo de Recibo */}
        {isTypeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-5">
                <h2 className="text-lg font-semibold mb-4 text-[#472825]">Nuevo Recibo</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Seleccione el tipo de recibo</label>
                  <select className="w-full border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2 text-sm">
                    <option>RC - RECIBO DE CAJA</option>
                    <option>RC 2 - RECIBO DE CAJA 2</option>
                  </select>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setIsTypeModalOpen(false)}
                    className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 transition-colors rounded-md font-medium text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleTypeModalAccept}
                    className="px-4 py-2 bg-[#D3AB80] text-white hover:bg-[#b89570] transition-colors rounded-md font-medium text-sm"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal Grande: Formulario */}
        {isMainModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#fdfbf9]">
                <h2 className="text-lg font-semibold text-[#472825]">
                  {editingId ? "Editar Recibo" : "Formulario de Recibo de Caja"}
                </h2>
                <button onClick={() => setIsMainModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card for inputs */}
                  <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                      <input
                        type="date"
                        value={formData.fecha}
                        onChange={e => setFormData({...formData, fecha: e.target.value})}
                        className="w-full border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                      <input
                        type="number"
                        value={formData.valor}
                        onChange={e => setFormData({...formData, valor: e.target.value})}
                        placeholder="Ej: 500000"
                        className="w-full border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2 text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tercero</label>
                      <input
                        type="text"
                        value={formData.tercero}
                        onChange={e => setFormData({...formData, tercero: e.target.value})}
                        placeholder="Nombre o NIT del Tercero"
                        className="w-full border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2 text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
                      <textarea
                        value={formData.concepto}
                        onChange={e => setFormData({...formData, concepto: e.target.value})}
                        rows={3}
                        placeholder="Observaciones o concepto del recibo..."
                        className="w-full border-gray-300 rounded-md focus:ring-[#D3AB80] focus:border-[#D3AB80] border p-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-gray-100 flex justify-between bg-gray-50">
                <button
                  onClick={() => setIsMainModalOpen(false)}
                  className="px-6 py-2 bg-red-50 text-red-600 hover:bg-red-100 transition-colors rounded-md font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleMainModalSave}
                  className="px-6 py-2 bg-[#D3AB80] text-white hover:bg-[#b89570] transition-colors rounded-md font-medium"
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
